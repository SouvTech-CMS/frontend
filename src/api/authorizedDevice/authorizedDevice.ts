import { axiosClient } from "api/axiosClient"
import { AuthorizedDevice } from "type/authorizedDevice/authorizedDevice"
import { WithId } from "type/withId"

export const getAllDevices = async (): Promise<WithId<AuthorizedDevice>[]> => {
  const { data: devicesList } = await axiosClient.get("/authorized_device/all/")
  return devicesList
}

export const checkDevice = async () => {
  await axiosClient.get("/authorized_device/current/check")
}

export const createDevice = async (
  device: AuthorizedDevice,
): Promise<WithId<AuthorizedDevice>> => {
  const { data: newDevice } = await axiosClient.post(
    "/authorized_device/",
    device,
  )
  return newDevice
}

// export const updateDevice = async (device: WithId<AuthorizedDevice>) => {
//   await axiosClient.put("/authorized_device/", device)
// }

export const deleteDevice = async (deviceId: number) => {
  await axiosClient.delete(`/authorized_device/${deviceId}`)
}
