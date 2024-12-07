import { MyTextInput } from '@renderer/components/common'
import MyButton from '@renderer/components/common/MyButton'
import { useEffect } from 'react'

const LoginPage: React.FC = () => {
  // const [currentVersion, setVersion] = useState('')
  // const [currentAppName, setAppName] = useState('')

  useEffect(() => {
    window.EUN_DEV_IPC.onMainEvent((_, message) => {
      window.alert(`MAIN EVENT: ${message}`)
    })
  }, [])

  // const onSendOneWayComms: () => void = () => {
  //   window.EUN_DEV_IPC.sendHello('from Login Page')
  // }

  // const onTwoWayComms: () => Promise<void> = async () => {
  //   try {
  //     const result = await window.EUN_DEV_IPC.getAppVersion()
  //     const { appName, version } = result

  //     setAppName(appName)
  //     setVersion(version)
  //   } catch (errorGetVersion) {
  //     window.EUN_DEV_IPC.sendHello(`err ${errorGetVersion}`)
  //   }
  // }

  // const renderIpcComponent: React.FC<{
  //   label: string
  //   buttonLabel: string
  //   onClick: React.MouseEventHandler<HTMLButtonElement>
  // }> = ({ label, buttonLabel, onClick }) => {
  //   return (
  //     <div className={'bg-background p-4 rounded-lg flex-wrap max-w-md mb-4'}>
  //       <p className="mb-2 text-secondaryText">{label}</p>
  //       <button
  //         onClick={onClick}
  //         className={
  //           'rounded-lg border-border border-2 hover:bg-light  hover:text-dark text-light font-bold p-2'
  //         }
  //       >
  //         {buttonLabel}
  //       </button>
  //     </div>
  //   )
  // }

  return (
    // Wrapped by FlexBox
    <div className="h-full overflow-y-scroll p-4 flex justify-end gap-x-4">
      {/* Test IPC comms  */}
      {/* <div className="bg-secondaryBackground rounded-xl py-5 px-10 flex-grow"> */}
      {/* <p>Version: {currentVersion}</p>
        <p>Appname: {currentAppName}</p>
        {renderIpcComponent({
          label: 'One-Way Communication',
          buttonLabel: 'Send One-Way Message',
          onClick: onSendOneWayComms
        })}
        {renderIpcComponent({
          label: 'Two-Way Communication',
          buttonLabel: 'Get App Version',
          onClick: onTwoWayComms
        })}
        {renderIpcComponent({
          label: 'Event-Driven Communication',
          buttonLabel: 'Go set event-driven',
          onClick: () => {
            console.log('--- TIP 3')
          }
        })} */}
      {/* </div> */}
      {/* Input form */}
      <div className="bg-secondaryBackground rounded-xl p-5 px-10 w-1/3 max-w-xl pt-56 flex flex-col items-stretch">
        <MyTextInput placeholder="Username" />
        <div className="mb-2"></div>
        <MyTextInput placeholder="Password" type="password" />
        <MyButton onClick={() => {}} label={'Login'} className="px-10 mt-4" />
      </div>
    </div>
  )
}

export default LoginPage
