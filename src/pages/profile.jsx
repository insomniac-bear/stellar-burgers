import ProfileForm from '../components/profile-form/profile-form';
import ProfileMenu from "../components/profile-menu/profile-menu";
import styles from './profile.module.css'

export const ProfilePage = () => {
  return (
    <div className='page'>
      <main className={styles.main}>
        <ProfileMenu />
        <ProfileForm />
      </main>
    </div>
  );
};
