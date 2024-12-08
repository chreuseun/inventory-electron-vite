export interface IRunVerifyUserResponseResult {
  id: string
  reference_id: string
  username: string
  is_active: 1 | 0
  created_at: string
}

export interface IRunVerifyUserResponse {
  success: boolean
  error: string | null
  result: IRunVerifyUserResponseResult[]
}

export interface IRunVerifyUser {
  username: string
  password: string
}

export type IUseVerifyUser = (args: {
  onCompleted: (data: IRunVerifyUserResponse) => void
  onError: (err: string) => void
}) => {
  runVerifyUser: ({ username, password }: IRunVerifyUser) => Promise<void>
  loading: boolean
}
