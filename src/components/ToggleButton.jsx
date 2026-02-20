import {useTheme} from './ThemeContext.jsx'
import './ToggleButton.css'

export default function ToggleButton(){
    const {theme, toggleTheme} = useTheme();

    return(
        <button className="toggle-button" onClick={toggleTheme}>
            {/*지금 다크모드(true)면 라이트 모드로 전환 버튼 보여줌*/}
            {theme ? '라이트 모드로 전환' : '다크 모드로 전환'}
        </button>
    )
}