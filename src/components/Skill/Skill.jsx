import './Skill.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import Services_Data from '../../assets/services_data'
// import arrow_icon from '../../assets/arrow_icon.svg'
import { Fragment } from 'react'

const Skill = () => {
    return (
        <div id='skill' className='services'>
            <div className="services-title">
                <h1>My skills</h1>
                <img src={theme_pattern} alt='' />
            </div>
            {/* <div className="skill-cloud">
                
            </div> */}
            <div className="services-container">
                {Services_Data.map((service, index) => {
                    return <div key={index} className="services-format">
                        <h3>{service.s_no}</h3>
                        <h2>{service.s_name}</h2>
                        {/* <p>{service.s_desc}</p> */}
                        <p className="services-format-list">
                            {service.s_desc.split(', ').map((item, index) => (
                                <Fragment key={index}>
                                    <span>{item}</span>
                                    {/* {index < service.s_desc.split(', ').length - 1} Add <hr> between items */}
                                </Fragment>
                            ))}
                        </p>

                        {/* <div className="services-readmore">
                            <p>Read More</p>
                            <img src={arrow_icon} alt='' />
                        </div> */}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Skill