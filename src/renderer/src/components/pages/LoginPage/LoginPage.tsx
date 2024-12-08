import { MyTextInput } from '@renderer/components/common'
import MyButton from '@renderer/components/common/MyButton'
import { useVerifyUser } from '@renderer/hooks/users'
import { useState } from 'react'

const LoginPage: React.FC = () => {
  const [username, setUN] = useState('')
  const [password, setPW] = useState('')

  const { runVerifyUser } = useVerifyUser({
    onCompleted: ({ result }) => {},
    onError: (errMsg) => {}
  })

  const onClickLogin: () => void = () => {
    runVerifyUser({
      username,
      password
    })
  }

  const onChangeUsernameInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value) {
      setUN(event.target.value)
    }
  }

  const onChangePasswordInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value) {
      setPW(event.target.value)
    }
  }

  return (
    <div className="h-full overflow-y-scroll p-4 flex justify-end gap-x-4">
      <div className="bg-secondaryBackground rounded-xl p-5 px-10 md:w-1/3 max-w-xl pt-56 flex flex-col items-stretch">
        <MyTextInput placeholder="Username" onChange={onChangeUsernameInput} />
        <div className="mb-2"></div>
        <MyTextInput placeholder="Password" type="password" onChange={onChangePasswordInput} />
        <MyButton onClick={onClickLogin} label={'Login'} className="px-10 mt-4" />
      </div>
    </div>
  )
}

export default LoginPage
