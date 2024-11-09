import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createAgoraRtcEngine, ChannelProfileType, ClientRoleType, RtcSurfaceView, AudienceLatencyLevelType } from 'react-native-agora';
import { useRouter } from 'expo-router';

const appId = '41ab4e0a448244239d721a3cb2abd221';
const token = '007eJxTYNA72+fGqbsttqYwZkX7EtNEPc+dvwTVBHedbYjMZWa9PluBwTQxOdEgMSXRODnZyMTCzMLS2MwixdDQxDDZ0sDQINU4pUgvvSGQkcHYSIaZkQECQXx2huSMxLy81BwGBgDKXxy6';
const channelName = 'channel';

const AudienceScreen = () => {
    const agoraEngineRef = useRef(null);
    const [isJoined, setIsJoined] = useState(false);
    const [remoteUid, setRemoteUid] = useState(0);
    const router = useRouter();

    useEffect(() => {
        setupVideoSDKEngine();
        return () => {
            agoraEngineRef.current?.release();
        };
    }, []);

    const setupVideoSDKEngine = async () => {
        agoraEngineRef.current = createAgoraRtcEngine();
        agoraEngineRef.current.initialize({ appId });
        agoraEngineRef.current.enableVideo();
        agoraEngineRef.current.registerEventHandler({
            onJoinChannelSuccess: () => setIsJoined(true),
            onUserJoined: (_, uid) => setRemoteUid(uid),
            onUserOffline: () => setRemoteUid(0),
        });
    };

    const joinChannel = () => {
        agoraEngineRef.current?.joinChannel(token, channelName, 0, {
            channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
            clientRoleType: ClientRoleType.ClientRoleAudience,
            audienceLatencyLevel: AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency,
        });
    };

    const leaveChannel = () => {
        agoraEngineRef.current?.leaveChannel();
        setIsJoined(false);
        setRemoteUid(0);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Audience Screen</Text>
            {isJoined ? (
                <>
                    {remoteUid ? (
                        <RtcSurfaceView canvas={{ uid: remoteUid }} style={styles.videoView} />
                    ) : (
                        <Text>Waiting for host to join...</Text>
                    )}
                    <TouchableOpacity onPress={leaveChannel} style={styles.button}>
                        <Text style={styles.buttonText}>Leave Stream</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity onPress={joinChannel} style={styles.button}>
                    <Text style={styles.buttonText}>Join Stream</Text>
                </TouchableOpacity>
            )}
            {/* <TouchableOpacity onPress={() => router.back()} style={styles.button}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    button: { backgroundColor: '#0055cc', padding: 10, marginVertical: 10, borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 18 },
    videoView: { width: '90%', height: 200 },
});

export default AudienceScreen;
