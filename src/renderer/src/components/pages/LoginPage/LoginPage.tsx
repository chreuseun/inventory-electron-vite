import { MyTextInput } from '@renderer/components/common'

const LoginPage: React.FC = () => {
  return (
    <div className="h-full overflow-y-scroll p-4 flex justify-end">
      <div className="bg-secondaryBackground rounded-xl p-5 px-10  w-1/3 max-w-xl pt-56">
        <MyTextInput placeholder="Username" />
        <div className="mb-2"></div>
        <MyTextInput placeholder="Password" />
      </div>
    </div>
  )
}

export default LoginPage
