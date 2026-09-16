import profile from '../../content/career-profile.json'

type DeepReadonly<T> = T extends object
  ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
  : T

export const careerProfile: DeepReadonly<typeof profile> = profile
