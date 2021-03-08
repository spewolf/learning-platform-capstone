import AuthProvider from '../components/AuthProvider'

export default function StorybookStudent(props) {
    // storybookstudent@test.test
    // password
    // course code: storybook
    return (<AuthProvider>
        {props.children}
    </AuthProvider>)
}