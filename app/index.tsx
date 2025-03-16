// Partner App - QR Code Generator (Web App)
// App.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    contactNumber: '',
    email: '',
    website: '',
    address: '',
    description: '',
    services: '',
    operatingHours: '',
    socialMedia: '',
  });
  
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrValue, setQrValue] = useState('');
  interface Profile {
    id: string;
    businessName: string;
    ownerName: string;
    contactNumber: string;
    email: string;
    website: string;
    address: string;
    description: string;
    services: string;
    operatingHours: string;
    socialMedia: string;
  }

  const [savedProfiles, setSavedProfiles] = useState<Profile[]>([]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const validateForm = () => {
    // Basic validation - required fields
    if (!formData.businessName || !formData.ownerName || !formData.contactNumber) {
      alert('Please fill in all required fields (Business Name, Owner Name, Contact Number)');
      return false;
    }
    
    // Validate email format
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    // Validate phone number
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      alert('Please enter a valid 10-digit contact number');
      return false;
    }
    
    return true;
  };
  
  const generateQRCode = () => {
    if (!validateForm()) return;
    
    // Create the QR code value as a JSON string
    const qrData = JSON.stringify(formData);
    setQrValue(qrData);
    setQrGenerated(true);
    
    // Save to profiles
    setSavedProfiles([
      ...savedProfiles,
      { ...formData, id: Date.now().toString() }
    ]);
  };
  
  const newProfile = () => {
    setQrGenerated(false);
    setFormData({
      businessName: '',
      ownerName: '',
      contactNumber: '',
      email: '',
      website: '',
      address: '',
      description: '',
      services: '',
      operatingHours: '',
      socialMedia: '',
    });
  };
  
  const loadProfile = (profile: Profile) => {
    setFormData(profile);
    const qrData = JSON.stringify(profile);
    setQrValue(qrData);
    setQrGenerated(true);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="business" size={30} color="#4a90e2" />
        <Text style={styles.headerTitle}>Partner QR Generator</Text>
      </View>
      
      {!qrGenerated ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Enter Business Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.businessName}
                onChangeText={(text) => handleInputChange('businessName', text)}
                placeholder="Enter business name"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Owner Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.ownerName}
                onChangeText={(text) => handleInputChange('ownerName', text)}
                placeholder="Enter owner name"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Number *</Text>
              <TextInput
                style={styles.input}
                value={formData.contactNumber}
                onChangeText={(text) => handleInputChange('contactNumber', text)}
                placeholder="Enter 10-digit contact number"
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Enter email address"
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Website</Text>
              <TextInput
                style={styles.input}
                value={formData.website}
                onChangeText={(text) => handleInputChange('website', text)}
                placeholder="Enter website URL"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.address}
                onChangeText={(text) => handleInputChange('address', text)}
                placeholder="Enter business address"
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
                placeholder="Enter business description"
                multiline
                numberOfLines={4}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Services Offered</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={formData.services}
                onChangeText={(text) => handleInputChange('services', text)}
                placeholder="Enter services (comma separated)"
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Operating Hours</Text>
              <TextInput
                style={styles.input}
                value={formData.operatingHours}
                onChangeText={(text) => handleInputChange('operatingHours', text)}
                placeholder="e.g. Mon-Fri: 9AM-5PM"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Social Media</Text>
              <TextInput
                style={styles.input}
                value={formData.socialMedia}
                onChangeText={(text) => handleInputChange('socialMedia', text)}
                placeholder="Enter social media links"
              />
            </View>
            
            <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
              <Ionicons name="qr-code" size={20} color="#fff" />
              <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.qrContainer}>
          <Text style={styles.qrTitle}>Generated QR Code for {formData.businessName}</Text>
          
          <View style={styles.qrCodeWrapper}>
            <QRCode
              value={qrValue}
              size={250}
              color="#000"
              backgroundColor="#fff"
              logoBackgroundColor="#fff"
            />
          </View>
          
          <Text style={styles.qrInstructions}>
            This QR code contains all your business information. Share it with users to scan.
          </Text>
          
          <TouchableOpacity style={styles.saveButton} onPress={() => alert('QR Code saved successfully!')}>
            <Ionicons name="download" size={20} color="#fff" />
            <Text style={styles.buttonText}>Save QR Code</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.newButton} onPress={newProfile}>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>Create New Profile</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {savedProfiles.length > 0 && (
        <View style={styles.savedProfilesContainer}>
          <Text style={styles.savedProfilesTitle}>Saved Profiles</Text>
          <ScrollView horizontal style={styles.profilesScrollView}>
            {savedProfiles.map((profile) => (
              <TouchableOpacity 
                key={profile.id} 
                style={styles.profileCard}
                onPress={() => loadProfile(profile)}
              >
                <Text style={styles.profileCardTitle}>{profile.businessName}</Text>
                <Text style={styles.profileCardSubtitle}>{profile.ownerName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  generateButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  qrContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  qrCodeWrapper: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  qrInstructions: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#38b2ac',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '80%',
    marginBottom: 15,
  },
  newButton: {
    backgroundColor: '#805ad5',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width: '80%',
  },
  savedProfilesContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    backgroundColor: '#fff',
  },
  savedProfilesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  profilesScrollView: {
    flexDirection: 'row',
  },
  profileCard: {
    width: 150,
    height: 80,
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    justifyContent: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
  },
  profileCardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  profileCardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});

// package.json
/*
{
  "name": "partner-qr-generator",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.15",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-native-qrcode-svg": "^6.2.0",
    "@expo/vector-icons": "^13.0.0",
    "react-native-svg": "13.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
*/