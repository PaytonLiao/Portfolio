import './MyWork.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mywork_data from '../../assets/mywork_data'
import github_logo from '../../assets/github-mark.svg'

const MyWork = () => {
  return (
    <div id='work' className="mywork">
        <div className="mywork-title">
            <h1>Projects</h1>
            <img src={theme_pattern} alt='' />
        </div>
        <div className="mywork-container">
            {mywork_data.map((work, index)=>{
                return (
                <div key={index} className='mywork-container-project'>
                    <a href={work.w_link}><img src={work.w_img} alt='' /></a>
                    <p>{work.w_name}</p>
                </div>
            )
            })}
        </div>
        <a href='https://github.com/PaytonLiao'>
        <div className="mywork-showmore">
            <p>More work on GitHub</p>
            <img src={github_logo} alt='' />
        </div>
        </a>
    </div>
  )
}

export default MyWork