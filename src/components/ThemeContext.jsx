// 다크모드 테마 및 테마 토글 기능을 위한 Context
// localStorage에서 테마 상태를 불러와서 초기값으로 사용 !!

/*
    다크모드로 만들 때 초기값을 어떻게 설정할지에서 고민이 많았는데,
    이는 GPT를 통하여 localStorage에서 테마 상태를 불러와서 
    초기값으로 사용하는 방법을 추천해주었다. 
    localStorage의 테마를 가져오면은 새로고침을 해도 유지된다는 점이 
    가장 큰 근거였다 !!
*/ 

/*
1. 버튼 클릭
   ↓
2. toggleTheme() 실행 → theme 상태 변경 (true/false)
   ↓
3. useEffect 감지 → document.documentElement.setAttribute('data-theme', 'dark')
   ↓
4. HTML: <html data-theme="dark">로 변경됨
   ↓
5. CSS가 [data-theme='dark'] 선택자를 감지
   ↓
6. --bg-color 등의 변수 값이 다크모드 값으로 덮어써짐
   ↓
7. var(--bg-color)를 사용하는 모든 요소가 자동으로 다크 색상 적용!

*/ 

import { createContext, useContext, useState, useEffect} from "react";

// Context 생성
const ThemeContext = createContext();

// Provider 컴포넌트 생성
// children은 ThemeProvider로 감싸진 컴포넌트들
export function ThemeProvider({children}){
    const [theme, setTheme] = useState(() => {
        // localStorage에서 theme 값을 가져와서 초기값으로 사용
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';   // localStorage에 저장된 테마가 'dark'이면 true, 아니면 false
    });

    // 테마 토글 함수
    const toggleTheme = () => {
        setTheme(prev => !prev);    // 이전 테마 상태를 반전시킴    
    };

    // 테마 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        const currentTheme = theme ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [theme]);    // theme 상태가 변경될 때마다 실행하기 위해 useEffect 사용

    return(
        // Context.Provider로 theme와 toggleTheme 함수를 전달하여 하위 컴포넌트들이 사용할 수 있도록 함
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

// 커스텀 Hook 생성
export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error('useTheme는 ThemeProvider 내에서 사용되어야 합니다');
    }
    return context;
}

