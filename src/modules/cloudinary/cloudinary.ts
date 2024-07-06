import {v2} from 'cloudinary'

export const CloudinaryProvider={
    provide:"CLOUDINARY",
    useFactory: () => {
        return v2.config({
            cloud_name: 'dpqnzt8qq',
            api_key: '572216212676456',
            api_secret: 'Ss72FJ-uC1OCG77EW1S4jhfd254',
        });
      },
}