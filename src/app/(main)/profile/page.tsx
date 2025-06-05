import FavoriteUniversities from "@/components/user/FavoriteUniversities";
import UserProfile from "@/components/user/UserProfile";

const Profile = () => {
  return (
    <section className="space-y-10">
      <UserProfile />
      <FavoriteUniversities />
    </section>
  );
};

export default Profile;
