import React from "react";
import { AuthProvider } from "../components/AuthProvider";

import ProfilePage from "../components/ProfilePage";

const storyMetaData = {
  title: "Profile Page",
  component: ProfilePage,
};
export default storyMetaData;

const Template = (args) => (
  <AuthProvider>
    <ProfilePage {...args} />
  </AuthProvider>
);
export const StudentProfilePage = Template.bind({});
StudentProfilePage.args = {};
