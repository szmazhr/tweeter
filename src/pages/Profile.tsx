// import styles from './Profile.module.css';

import ProfileCore from '../components/ProfileCore';
import TopBar from '../components/TopBar';

function Profile() {
  return (
    <>
      <main>
        <TopBar title="Shahzar Mazhar" backBtn subTitle="0 tweet" />
        <ProfileCore type="full" />
      </main>
      <section>sidebar right</section>
    </>
  );
}
export default Profile;
