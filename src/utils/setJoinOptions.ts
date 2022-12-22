export type JoinParams = {
  isMicrophonePermission: boolean;
  isCameraPermission: boolean;
  isAudio: boolean;
  isVideo: boolean;
};

const setJoinOptions = ({ isMicrophonePermission, isCameraPermission, isAudio, isVideo }: JoinParams) => {
  return {
    dvwc: import.meta.env.VITE_MUSIC_MODE === 'true',
    constraints: {
      audio: isMicrophonePermission && isAudio,
      video:
        isCameraPermission && isVideo
          ? {
              width: {
                min: '1280',
                max: '1920',
              },
              height: {
                min: '720',
                max: '1080',
              },
            }
          : false,
    },
  };
};

export default setJoinOptions;
