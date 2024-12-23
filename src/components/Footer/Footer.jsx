import './Footer.css'
import footer_logo from '../../assets/footer_logo.svg'
import user_icon from '../../assets/user_icon.svg'

const Footer = () => {
    const handleOnclick = async () => {
        alert("Coming Soon!");
        
      };

    return (
    <div className='footer'>
        <div className="footer-top">
            <div className="footer-top-left">
                <img src={footer_logo} alt=''/>
                <p>I&apos;m Payton Liao, aspiring software engineer based in the UK/Taiwan.</p>
            </div>
            <div className="footer-top-right">
                <div className="footer-email-input">
                    <img src={user_icon} alt=''/>
                    <input type='email' placeholder='Enter your email' />
                </div>
                <div onClick={handleOnclick} className="footer-subscribe">Subscribe</div>
            </div>
        </div>
        <hr />
        <div className="footer-bottom">
            <p className="footer-bottom-left">© 2025 Payton Liao. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer