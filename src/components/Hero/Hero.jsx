import './Hero.css'
// import profile_img from '../../assets/profile_img.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {

  return (
    <div className='hero'>
        {/* <img src={profile_img} alt='' /> */}
        <p>Aspiring software engineer based in the UK/Taiwan. <br/>
        Currently in his penultimate year and is actively seeking for internship oppourtunities.</p>
        <h1>Payton Liao 👋</h1>
        <div className='hero-action'>
            <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect With Me</ AnchorLink></div>
            {/* <div onClick={handleDownload} className="hero-resume">My resume</div> */}
        </div>
        <p>Keep Scrolling!</p>
    </div>
  )
}

export default Hero