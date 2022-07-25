/* eslint-disable react/jsx-no-useless-fragment */
import {
  Button,
  Input,
  Space,
  Session,
  Conference,
  Layout,
  ParticipantsList,
  ParticipantsGrid,
  LocalToggleAudioButton,
  LocalToggleVideoButton,
  LeaveConferenceButton,
  CameraSelect,
  MicrophoneSelect,
  SpeakersSelect,
} from '@dolbyio/comms-uikit-react';
import React, { useState } from 'react';

export const ConferenceComponents = () => {
  const [inMeeting, setInMeeting] = useState(false);
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlias(e.target.value);
  };
  return (
    <>
      {inMeeting && name.length > 2 && alias.length > 2 ? (
        <Session participantInfo={{ name }}>
          <Conference audio video alias={alias}>
            <Layout>
              <ParticipantsList
                localText="you"
                muteText="mute"
                unmuteText="unmute"
                soundOnText="sound on"
                soundOffText="sound off"
              />
              <ParticipantsGrid localText="you" />
              <Space style={{ display: 'flex', justifyContent: 'center' }} mv="m">
                <Space mr="s">
                  <LocalToggleAudioButton />
                </Space>
                <Space mr="s">
                  <LocalToggleVideoButton />
                </Space>
                <LeaveConferenceButton tooltipText="Leave" onSuccess={() => setInMeeting(false)} />
              </Space>
              <Space>
                <Space mb="s">
                  <CameraSelect label="Camera" placeholder="Camera" labelColor="white" />
                </Space>
                <Space mb="s">
                  <MicrophoneSelect label="Microphone" placeholder="Microphone" />
                </Space>
                <Space mb="s">
                  <SpeakersSelect label="Speakers" placeholder="Speakers" />
                </Space>
              </Space>
            </Layout>
          </Conference>
        </Session>
      ) : (
        <Space p="l">
          <Space mb="s">
            <Input value={name} label="Name" onChange={handleNameChange} />
          </Space>
          <Space mb="s">
            <Input value={alias} label="Meeting" onChange={handleAliasChange} />
          </Space>
          <Button variant="primary" onClick={() => setInMeeting(true)}>
            Join
          </Button>
        </Space>
      )}
    </>
  );
};
