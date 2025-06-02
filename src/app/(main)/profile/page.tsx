"use client";

import { useGetProfileQuery } from "@/lib/redux/api/auth";

const Profile = () => {
  const { data: userProfile } = useGetProfileQuery();

  return <div>Profile</div>;
};

export default Profile;
