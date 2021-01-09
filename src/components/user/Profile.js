import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Row,
  Col,
  Input,
  Button,
  Steps,
  Tabs,
  Upload,
  message,
  PageHeader,
  Affix,
} from "antd";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import moment from "moment";

import requireAuth from "../HOCs/requireAuth";
import withRequestLoading from "../HOCs/withRequestLoading";
import withRequestStatus from "../HOCs/withRequestStatus";
import NumericInput from "../common/NumericInput";
import {
  fetchUsersProfile,
  updateUsersProfile,
  fetchLanguages,
  fetchDesignations,
  fetchSpecialties,
} from "../../actions";
import { ICARUS_API_BASE_URL, LS_XS } from "../../constants";
import RenderUserAvatar from "../common/RenderUserAvatar";
import DynamicForm from "../common/DynamicForm";
import AddressItems from "../common/FormItems/AddressItems";
import WaitItems from "../common/FormItems/WaitItems";
import ApiResourceSelect from "../common/ApiResourceSelect";

const cookie = new Cookies();

const FormItem = Form.Item;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";

  if (!isJPG && !isPNG) {
    message.error("You can only upload JPG or PNG files!");
  }

  const isLt4M = file.size / 1024 / 1024 < 4;
  if (!isLt4M) {
    message.error("Image must smaller than 4MB!");
  }

  return (isJPG || isPNG) && isLt4M;
}

class ProfileForm extends React.Component {
  state = {
    hasProfilePicUpdated: false,
  };

  generateAddressObject = (
    start_hour,
    end_hour,
    is_wheelchair_accessible,
    is_accepting_new_patients,
    phone,
    fax,
    address,
    latitude,
    longitude
  ) => {
    // This function should be temporary. We should NOT need to do this!
    return {
      start_hour: start_hour ? start_hour : null,
      end_hour: end_hour ? end_hour : null,
      is_wheelchair_accessible: is_wheelchair_accessible
        ? is_wheelchair_accessible
        : false,
      is_accepting_new_patients: is_accepting_new_patients
        ? is_accepting_new_patients
        : false,
      phone: phone ? phone : "",
      fax: fax ? fax : "",
      address: address && address,
      latitude: latitude && latitude,
      longitude: longitude && longitude,
      geo: `POINT(${longitude.toString()} ${latitude.toString()})`,
    };
  };

  generateProceduralWaitTimeObject = (procedure, wait_time) => {
    // This function should be temporary. We should NOT need to do this!
    return {
      procedure: procedure ? procedure : "",
      wait_time: wait_time ? wait_time : null,
    };
  };

  handleProfilePictureChange = (info) => {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
          hasProfilePicUpdated: true,
        })
      );
      message.success("File uploaded successfully!");
    } else if (info.file.status === "error") {
      message.error("File upload failed.");
    }
  };

  componentDidMount() {
    this.props.fetchUsersProfile(
      this.props.providerUuid ? this.props.providerUuid : null
    );
  }

  componentDidUpdate() {
    if (this.state.hasProfilePicUpdated) {
      this.props.fetchUsersProfile(
        this.props.providerUuid ? this.props.providerUuid : null
      );
      this.setState({
        hasProfilePicUpdated: false,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // We have to do this because we decided to put the entire page on a single form.
        // Antd doesn't render each tab until it is clicked which means sometimes the values are missed.
        let addressValues = [];
        if (values.profileAddress) {
          addressValues = values.profileAddress.map((addressId) => {
            return this.generateAddressObject(
              values.dynamic_hours[addressId].startTime.format("HH:mm"),
              values.dynamic_hours[addressId].endTime.format("HH:mm"),
              values.is_wheelchair_accessibles[addressId],
              values.is_accepting_patients[addressId],
              values.phones[addressId],
              values.faxes[addressId],
              values.addresses[addressId].address,
              values.addresses[addressId].location.lat,
              values.addresses[addressId].location.lon
            );
          });
        } else {
          // We do this to fix any potential null values, and set the geo.
          addressValues = values.dynamic_addresses.map((currentAddress) => {
            return this.generateAddressObject(
              moment(currentAddress.start_hour, "HH:mm:ss").format("HH:mm"),
              moment(currentAddress.end_hour, "HH:mm:ss").format("HH:mm"),
              currentAddress.is_wheelchair_accessible,
              currentAddress.is_accepting_new_patient,
              currentAddress.phone,
              currentAddress.fax,
              currentAddress.address,
              currentAddress.latitude,
              currentAddress.longitude
            );
          });
        }

        let proceduralWaitValues = [];
        if (values.profileWait) {
          proceduralWaitValues = values.profileWait.map((waitId) => {
            return this.generateProceduralWaitTimeObject(
              values.procedures[waitId],
              values.wait_times[waitId]
            );
          });
        } else {
          // We do this to fix any potential null values, and set the geo.
          proceduralWaitValues = values.dynamic_wait_times.map(
            (currentDynamicWait) => {
              return this.generateProceduralWaitTimeObject(
                currentDynamicWait.procedure,
                currentDynamicWait.wait_time
              );
            }
          );
        }

        var submission = {
          name: values.name,
          email: values.email,
          provider: {
            designations:
              values.designation_ids.length === 0
                ? []
                : values.designation_ids.map((id) => {
                    return {
                      id,
                      name: "",
                    };
                  }),

            languages:
              values.language_ids.length === 0
                ? []
                : values.language_ids.map((id) => {
                    return {
                      id,
                      name: "",
                    };
                  }),

            referral_instructions: values.referral_instructions
              ? values.referral_instructions
              : "",
            research_interests: values.research_interests
              ? values.research_interests
              : "",
            services_provided: values.services_provided
              ? values.services_provided
              : "",
            services_not_provided: values.services_not_provided
              ? values.services_not_provided
              : "",
            ...(values.specialty_id && {
              specialty: {
                id: values.specialty_id,
                name: "",
              },
            }),
            subspecialty_or_special_interests: values.subspecialty_or_special_interests
              ? values.subspecialty_or_special_interests
              : "",
            consultation_wait: values.consultation_wait
              ? values.consultation_wait.toString()
              : null,
            addresses: addressValues,
            procedural_wait_times:
              proceduralWaitValues.length === 0 ? [] : proceduralWaitValues,
            education_and_qualifications: values.education_and_qualifications
              ? values.education_and_qualifications
              : "",
          },
        };

        this.props.updateUsersProfile(
          submission,
          this.props.providerUuid || null
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const {
      email,
      name,
      profile_picture_link,
      provider: {
        specialty,
        addresses,
        education_and_qualifications,
        consultation_wait,
        procedural_wait_times,
        research_interests,
        services_not_provided,
        referral_instructions,
        services_provided,
        subspecialty_or_special_interests,
        languages,
        designations,
      },
    } = this.props.profile;

    return (
      <div>
        {this.props.providerUuid && (
          <PageHeader
            style={{ paddingTop: "0" }}
            onBack={() => this.props.history.push("/")}
            title={`Currently editing the profile of ${name}`}
          />
        )}
        <Row
          type="flex"
          justify="space-around"
          style={{ padding: "25px 0" }}
          align="middle"
        >
          <Col
            span={4}
            style={{
              textAlign: "center",
              opacity: 1,
              transform: "translate(0px, 0px)",
              fontSize: "24px",
            }}
          >
            <RenderUserAvatar
              profile_picture_link={profile_picture_link}
              size={200}
            />

            <Upload
              name="image"
              accept="image/jpeg,image/png"
              action={`${ICARUS_API_BASE_URL}/users/${
                this.props.providerUuid || cookie.get("u")
              }/profile_pic`}
              withCredentials={true}
              headers={{ "X-CSRF-Token": localStorage.getItem(LS_XS) }}
              beforeUpload={beforeUpload}
              onChange={this.handleProfilePictureChange}
            >
              <Button>
                <UploadOutlined /> Upload Profile Photo
              </Button>
            </Upload>
          </Col>
          <Col
            type="flex"
            span={16}
            style={{
              textAlign: "left",
              opacity: 1,
              transform: " translate(0px, 0px)",
              fontSize: "24px",
            }}
          >
            <Row
              type="flex"
              style={{ justifyContent: "center" }}
              align="middle"
            >
              <Steps size="small" current={this.props.isVerified ? 3 : 2}>
                <Step title="Register" />
                <Step title="Confirm Email" />
                <Step
                  title="Profile"
                  description="Update your account information"
                />
                <Step
                  title="Verified"
                  description="Verify your identity as a licensed physician"
                />
              </Steps>
            </Row>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Row type="flex" justify="space-around">
            <Col
              span={16}
              style={{
                padding: "2.5vh 20px",
                textAlign: "left",
                opacity: 1,
                transform: "translate(0px, 0px)",
                fontSize: "24px",
              }}
            >
              <div style={{ borderTop: "1px solid #ebedf0", padding: "5px 0" }}>
                <Tabs tabPosition="left" size="large" defaultActiveKey="1">
                  <TabPane tab="Contact" key="1">
                    <FormItem label={"Name"}>
                      {getFieldDecorator("name", {
                        initialValue: name,
                        rules: [
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                          {
                            max: 100,
                            message: "Name's cannot exceed 100 characters.",
                          },
                        ],
                      })(<Input readOnly />)}
                    </FormItem>
                    <FormItem label={"Email"}>
                      {getFieldDecorator("email", {
                        initialValue: email,
                        rules: [
                          {
                            message: "Please input an E-mail address!",
                            required: true,
                          },
                          {
                            type: "email",
                            message: "The input is not a valid E-mail address!",
                          },
                          {
                            max: 100,
                            message:
                              "E-mail addresses cannot exceed 100 characters.",
                          },
                        ],
                      })(<Input readOnly />)}
                    </FormItem>
                  </TabPane>
                  <TabPane tab="About You" key="2">
                    <FormItem label="Languages Spoken">
                      {getFieldDecorator("language_ids", {
                        initialValue:
                          languages && languages.map((item) => item.id),
                      })(
                        <ApiResourceSelect
                          resourceActionCreator={fetchLanguages}
                          mode="multiple"
                          placeholder="Select Languages"
                          resourceReducerName="languagesReducer"
                          resourceName="languages"
                        />
                      )}
                    </FormItem>
                    <FormItem label="Designations">
                      {getFieldDecorator("designation_ids", {
                        initialValue:
                          designations && designations.map((item) => item.id),
                      })(
                        <ApiResourceSelect
                          resourceActionCreator={fetchDesignations}
                          mode="multiple"
                          placeholder="Select Designation"
                          resourceReducerName="designationsReducer"
                          resourceName="designations"
                        />
                      )}
                    </FormItem>
                    <FormItem label="Specialty">
                      {getFieldDecorator("specialty_id", {
                        initialValue: specialty && specialty.id,
                      })(
                        <ApiResourceSelect
                          resourceActionCreator={fetchSpecialties}
                          placeholder="Select Specialty"
                          resourceReducerName="specialtiesReducer"
                          resourceName="specialties"
                        />
                      )}
                    </FormItem>
                    <FormItem label="Subspecialty or Special Interests">
                      {getFieldDecorator("subspecialty_or_special_interests", {
                        initialValue: subspecialty_or_special_interests,
                        rules: [
                          {
                            max: 200,
                            message:
                              "Subspecialty or Special Interests cannot exceed 200 characters.",
                          },
                        ],
                      })(<Input />)}
                    </FormItem>

                    <FormItem label="Education and Qualifications">
                      {getFieldDecorator("education_and_qualifications", {
                        initialValue: education_and_qualifications,
                        rules: [
                          {
                            max: 500,
                            message:
                              "Education and Qualifications cannot exceed 500 characters.",
                          },
                        ],
                      })(<TextArea autosize />)}
                    </FormItem>

                    <FormItem label="Research Interests">
                      {getFieldDecorator("research_interests", {
                        initialValue: research_interests,
                        rules: [
                          {
                            max: 500,
                            message:
                              "Research Interests cannot exceed 500 characters.",
                          },
                        ],
                      })(<TextArea autosize />)}
                    </FormItem>
                  </TabPane>
                  <TabPane tab="Practice Information" key="3">
                    <FormItem label="Services Provided">
                      {getFieldDecorator("services_provided", {
                        initialValue: services_provided,
                        rules: [
                          {
                            max: 500,
                            message:
                              "Services Provided cannot exceed 500 characters.",
                          },
                        ],
                      })(<TextArea autosize />)}
                    </FormItem>

                    <FormItem label="Services Not Provided">
                      {getFieldDecorator("services_not_provided", {
                        initialValue: services_not_provided,
                        rules: [
                          {
                            max: 500,
                            message:
                              "Services Not Provided cannot exceed 500 characters.",
                          },
                        ],
                      })(<TextArea autosize />)}
                    </FormItem>

                    <FormItem label="Referral Instructions">
                      {getFieldDecorator("referral_instructions", {
                        initialValue: referral_instructions,
                        rules: [
                          {
                            max: 500,
                            message:
                              "Referral Instructions cannot exceed 500 characters.",
                          },
                        ],
                      })(<TextArea autosize />)}
                    </FormItem>
                  </TabPane>
                  <TabPane tab="Practice Addresses" key="4">
                    {getFieldDecorator("dynamic_addresses", {
                      initialValue: addresses,
                    })(
                      <DynamicForm
                        parentForm={this.props.form}
                        ChildFormItems={AddressItems}
                        childFormItemTitle="Address"
                        childFormItemKey="profileAddress"
                      />
                    )}
                  </TabPane>
                  <TabPane tab="Wait Times" key="5">
                    <FormItem label="Consultations (Days)">
                      {getFieldDecorator("consultation_wait", {
                        initialValue: Number(consultation_wait),
                        rules: [
                          {
                            type: "number",
                            min: 0,
                            max: 2000,
                            message:
                              "Consultation wait must be between 0 and 2000.",
                          },
                        ],
                      })(<NumericInput />)}
                    </FormItem>

                    <FormItem>
                      {getFieldDecorator("dynamic_wait_times", {
                        initialValue: procedural_wait_times,
                      })(
                        <DynamicForm
                          parentForm={this.props.form}
                          ChildFormItems={WaitItems}
                          childFormItemTitle="Wait Time"
                          childFormItemKey="profileWait"
                        />
                      )}
                    </FormItem>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
            <Col
              span={2}
              style={{
                padding: "2.5vh 0 0 0",
              }}
            >
              <Affix offsetTop={100}>
                <Button
                  size="large"
                  style={{ margin: "0.5em" }}
                  type="primary"
                  htmlType="submit"
                  loading={
                    this.props.isLoadingUsersProfile &&
                    this.props.isProfileUpdate
                  }
                >
                  Submit
                </Button>
              </Affix>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const Profile = Form.create()(ProfileForm);

const mapStateToProps = (state) => {
  const {
    isLoading: isLoadingUsersProfile,
    profile,
    errorMessage,
    isProfileUpdate,
    responseMessage,
    isVerified,
  } = state.usersProfileReducer;

  return {
    isLoadingUsersProfile,
    isLoading: isLoadingUsersProfile && !isProfileUpdate,
    profile,
    errorMessage,
    isProfileUpdate,
    responseMessage,
    isVerified,
  };
};

export default connect(mapStateToProps, {
  fetchUsersProfile,
  updateUsersProfile,
})(requireAuth(withRequestLoading(withRequestStatus(Profile))));
