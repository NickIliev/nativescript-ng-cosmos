export class RoverPhoto {
    public id: number;
    public sol: number;
    public cameraId: number;
    public cameraName: string;
    public cameraRoverId: number;
    public cameraFullName: string;
    public imageUri: string;
    public earthDate: string;

    constructor(
        id: number,
        sol: number,
        cameraId: number,
        cameraName: string,
        cameraRoverId: number,
        cameraFullName: string,
        imageUri: string,
        earthDate: string
    ) {
        this.id = id;
        this.sol = sol;
        this.cameraId = cameraId;
        this.cameraName = cameraName;
        this.cameraRoverId = cameraRoverId;
        this.cameraFullName = cameraFullName;
        this.imageUri = imageUri;
        this.earthDate = earthDate;
    }
}
