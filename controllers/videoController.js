export const getMeetingLink = (req, res) => {
    // Generate a Jitsi Meet link with parameters
    const meetingLink = 'https://meet.jit.si/' + encodeURIComponent('MyMeetingRoom');
    res.status(200).json({ link: meetingLink });
  };
  