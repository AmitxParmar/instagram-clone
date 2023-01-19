import InstagramLogo from "../images/splash_screen_logo.png";

function SplashScreen() {
  return (
    <div className="absolute flex flex-center align-center content-center center self-center place-items-center h-screen">
      <img
        src={InstagramLogo}
        alt="instagram logo"
        width={40}
        height={40}
        placeholder="blur"
      />
    </div>
  );
}

export default SplashScreen;