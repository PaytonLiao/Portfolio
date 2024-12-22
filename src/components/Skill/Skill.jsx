import './Skill.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import SkillSphere from './SkillSphere/SkillSphere'

const Skill = () => {
    return (
        <div id='skill' className='skill'>
            <div className="skill-title">
                <h1>My skills</h1>
                <img src={theme_pattern} alt='' />
            </div>
            <div className="skill-cloud">
                <SkillSphere />
            </div>
        </div>
    )
}

export default Skill