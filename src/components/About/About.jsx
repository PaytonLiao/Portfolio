import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '/payton_square_photo.jpg'


const About = () => {
    return (
        <div id='about' className='about'>
            <div className="about-title">
                <h1>About me</h1>
                <img src={theme_pattern} alt='' />
            </div>
            <div className="about-sections">
                <div className="about-left">
                    <img src={profile_img} alt='' />
                </div>
                <div className="about-right">
                    <div className="about-para">
                        <p>
                            Hi, I&apos;m Payton Liao, a software developer driven by a passion for creating impactful and accessible web solutions. I specialise in crafting dynamic frontends and robust backends using tools like React, Django, and Javascript. </p>
                        <p>
                            Currently pursuing an MEng in Robotics and AI at UCL, I&apos;m blending my love for problem-solving with technical expertise to build meaningful web experiences. Let&apos;s connect to bring innovative ideas to life!
                        </p>
                    </div>
                    {/* <div className="about-skills">
                        <div className="about-skill"><p>Frontend </p><hr style={{ width: "100%" }} /></div>
                        <div className="about-skill"><p>AI </p><hr style={{ width: "75%" }} /></div>
                        <div className="about-skill"><p>Backend </p><hr style={{ width: "50%" }} /></div>
                        <div className="about-skill"><p>Embedded </p><hr style={{ width: "50%" }} /></div>
                    </div> */}
                </div>
            </div>
            <div className="about-achievements">
                <div className="about-achievement">
                    <h1>3</h1>
                    <p>YEARS OF CODING EXPERIENCE</p>
                </div>
                <hr />
                <div className="about-achievement">
                    <h1>Winner</h1>
                    <p>OF AI HACKATHON LONDON 2024</p>
                </div>
                <hr />
                <div className="about-achievement">
                    <h1>2</h1>
                    <p>PREVIOUS INTERNSHIP EXPERIENCE</p>
                </div>
            </div>
        </div>
    )
}

export default About