import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

export default function Room() {
    const { roomId } = useParams();
    const elementRef = useRef(null);

    useEffect(() => {
        if (roomId) {
            myMeeting(elementRef.current);
        }
    }, [roomId]);

    const myMeeting = async (element) => {
        const appID = 781120951;
        const serverSecret = "94b578d2ec976cd655d65dbab07727d7";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            "Enter your name"
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [{
                name: 'Copy Link',
                url: `${window.location.origin}/room/${roomId}`
            }],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton: true
        });
    };

    return (
        <div>
            <div ref={elementRef} />
        </div>
    );
}
