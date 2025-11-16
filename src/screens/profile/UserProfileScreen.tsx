import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Button, Input, Avatar } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export const UserProfileScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const data = useData();
  const student = data.getCurrentStudent();
  
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: signOut },
      ]
    );
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity onPress={() => setEditing(!editing)} style={styles.editButton}>
            <Text style={[styles.editIcon, { color: colors.primary }]}>
              {editing ? '✕' : '✏️'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.profileHeader, { backgroundColor: colors.card }]}>
            <TouchableOpacity style={styles.avatarContainer}>
              <Avatar
                source={student?.profilePicture}
                size={100}
              />
              {editing && (
                <View style={[styles.editAvatarBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.editAvatarIcon}>📷</Text>
                </View>
              )}
            </TouchableOpacity>
            <Text style={[styles.userName, { color: colors.text }]}>{user?.name}</Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user?.email}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
            
            <Input
              label="Full Name"
              value={name}
              onChangeText={setName}
              editable={editing}
            />

            <Input
              label="Email"
              value={user?.email || ''}
              onChangeText={() => {}}
              editable={false}
            />

            <Input
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              editable={editing}
            />

            <Input
              label="College"
              value={student?.college || ''}
              onChangeText={() => {}}
              editable={false}
            />

            <Input
              label="Student ID"
              value={student?.id || ''}
              onChangeText={() => {}}
              editable={false}
            />

            <Input
              label="Bio"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              editable={editing}
            />

            {editing && (
              <Button
                title="Save Changes"
                onPress={handleSave}
                fullWidth
              />
            )}
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuItemText, { color: colors.text }]}>Change Password</Text>
              <Text style={styles.menuItemIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuItemText, { color: colors.text }]}>Notification Settings</Text>
              <Text style={styles.menuItemIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuItemText, { color: colors.text }]}>Privacy Policy</Text>
              <Text style={styles.menuItemIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuItemText, { color: colors.text }]}>Terms of Service</Text>
              <Text style={styles.menuItemIcon}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.logoutContainer}>
            <Button
              title="Logout"
              onPress={handleLogout}
              variant="danger"
              fullWidth
            />
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center' },
  editButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  editIcon: { fontSize: 20 },
  scrollView: { flex: 1 },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarIcon: { fontSize: 16 },
  userName: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  userEmail: { fontSize: 16 },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemText: { fontSize: 16 },
  menuItemIcon: { fontSize: 20, color: '#9CA3AF' },
  logoutContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  bottomSpacer: { height: 80 },
});
