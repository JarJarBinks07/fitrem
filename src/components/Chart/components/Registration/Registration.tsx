import React, { useMemo } from "react";

import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonCheckbox,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonText,
  IonButton,
} from "@ionic/react";
import { Capacitor } from "@capacitor/core";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  deviceOs: string;
}

const Registration: React.FC = () => {
  const platform = Capacitor.getPlatform();

  // const initialValues = useMemo<FormValues>(() => {
  //     return {
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         password: "",
  //         phoneNumber: "",
  //         deviceOs: platform
  //     };
  //   }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // phoneNumber: "",
      deviceOs: platform,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2, "Mininum 2 characters").max(15, "Maximum 15 characters").required("Required!"),
      lastName: Yup.string().min(2, "Mininum 2 characters").max(15, "Maximum 15 characters").required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string().min(8, "Minimum 8 characters").required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
      deviceOs: Yup.string().min(2, "Mininum 2 characters"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/timer" />
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={formik.handleSubmit}>
          <IonList>
            <IonItem>
              <IonInput
                type="text"
                label="First Name"
                labelPlacement="floating"
                name="firstName"
                value={formik.values.firstName}
                onIonChange={formik.handleChange}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <IonText className="ion-padding" color="danger">
                  {formik.errors.firstName}
                </IonText>
              )}
            </IonItem>
            <IonItem>
              <IonInput
                type="text"
                label="Last Name"
                labelPlacement="floating"
                name="lastName"
                value={formik.values.lastName}
                onIonChange={formik.handleChange}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <IonText className="ion-padding" color="danger">
                  {formik.errors.lastName}
                </IonText>
              )}
            </IonItem>
            <IonItem>
              <IonInput
                type="text"
                label="Email"
                labelPlacement="floating"
                name="email"
                value={formik.values.email}
                onIonChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <IonText className="ion-padding" color="danger">
                  {formik.errors.email}
                </IonText>
              )}
            </IonItem>
            <IonItem>
              <IonInput
                type="text"
                label="Password"
                labelPlacement="floating"
                name="password"
                value={formik.values.password}
                onIonChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <IonText className="ion-padding" color="danger">
                  {formik.errors.password}
                </IonText>
              )}
            </IonItem>
            <IonItem>
              <IonInput
                type="text"
                label="Confirm password"
                labelPlacement="floating"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onIonChange={formik.handleChange}
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <IonText className="ion-padding" color="danger">
                  {formik.errors.confirmPassword}
                </IonText>
              )}
            </IonItem>
            <IonItem>
              <IonInput
                type="text"
                label="Device"
                labelPlacement="floating"
                name="deviceOs"
                value={formik.values.deviceOs}
                onIonChange={formik.handleChange}
              />
              {formik.errors.deviceOs && formik.touched.deviceOs && (
                <IonText className="ion-padding" color="danger">
                  {formik.errors.deviceOs}
                </IonText>
              )}
            </IonItem>
          </IonList>
          <div>
            <IonButton type="submit" expand="block">
              Submit
            </IonButton>
          </div>
        </form>
      </IonContent>
    </>
  );
};

export default Registration;
