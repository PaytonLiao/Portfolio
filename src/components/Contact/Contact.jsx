import './Contact.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mail_icon from '../../assets/mail_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'
// import { useState } from 'react'

const Contact = () => {
    // const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        // setResult("Sending....");
        const formData = new FormData(event.target);
    
        formData.append("access_key", "d6f4dddc-beee-4f15-9064-0e317c720cef");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
        //   setResult("Form Submitted Successfully");
        alert(data.message);
          event.target.reset();
        } else {
          console.log("Error", data);
        //   setResult(data.message);
        }
      };
    

    return (
        <div id='contact' className='contact'>
            <div className="contact-title">
                <h1>Get in touch</h1>
                <img src={theme_pattern} alt='' />
            </div>
            <div className="contact-section">
                <div className="contact-left">
                    <h1>Let&apos;s talk</h1>
                    <p>Available to work from June 2025 to September 2025. Feel free to contact me if you are looking for a software intern. Hennge please give me a chance~ 🥺</p>
                    <div className="contact-details">
                        <div className="contact-detail">
                            <img src={mail_icon} alt='' /> <p>payton.liao@gmail.com</p>
                        </div>
                        <div className="contact-detail">
                            <img src={call_icon} alt='' /> <p>+44 7940777287</p>
                        </div>
                        <div className="contact-detail">
                            <img src={location_icon} alt='' /> <p>London, UK</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={onSubmit} action="" className="contact-right">
                    <label htmlFor="">Your Name</label>
                    <input type="text" placeholder='Enter your name' name='name' />
                    <label htmlFor="">Your Email</label>
                    <input type="text" placeholder='Enter your email' name='email' />
                    <label htmlFor="">Write your message here</label>
                    <textarea name='message' rows='8' placeholder='Enter your message here'></textarea>
                    <button type='submit' className='contact-submit' >Submit now</button>
                </form>
            </div>
        </div>
    )
}

export default Contact