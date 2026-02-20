import {useTheme} from './ThemeContext.jsx'
import './ToggleButton.css'

export default function ToggleButton(){
    const {theme, toggleTheme} = useTheme();

    return(
        <button className="toggle-button" onClick={toggleTheme}>
            {theme ? '라이트 모드로 전환' : '다크 모드로 전환'}
        </button>
    )
}