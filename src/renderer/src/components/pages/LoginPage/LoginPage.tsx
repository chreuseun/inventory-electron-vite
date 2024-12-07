import { MyTextInput } from '@renderer/components/common'
import MyButton from '@renderer/components/common/MyButton'
import { useEffect } from 'react'

const LoginPage: React.FC = () => {
  useEffect(() => {
    const testRun: () => void = () => {
      window.RENDERER_DB_CRUD.executeLocalDB<unknown>({
        action: 'read',
        payload: {
          sql: `
            INSERT INTO users (
              reference_id,
              username,
              password,
              is_active,
              created_by,
              updated_by
            ) VALUES (
             ?, ?, ?, ?, ?, ?
            );
          `,
          params: ['root2REF', 'root2', 'password', 0, 'admin', null],

          operationName: 'OPT_TEST'
        }
      })
    }

    testRun()
  }, [])

  return (
    <div className="h-full overflow-y-scroll p-4 flex justify-end gap-x-4">
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
