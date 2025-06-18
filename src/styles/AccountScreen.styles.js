import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    backgroundColor: '#6C63FF',
    paddingVertical: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authButtons: {
    flexDirection: 'row',
  },
  loginBtn: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  loginBtnText: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  registerBtn: {
    backgroundColor: '#6C63FF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  registerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // ...các style khác nếu cần cho phần đã đăng nhập...
  headerLoggedIn: {
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  loggedInName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 12,
  },
  logoutBtn: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  logoutBtnText: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 1,
    marginHorizontal: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  orderItem: {
    alignItems: 'center',
    flex: 1,
  },
  orderLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  utilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  utilityItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  utilityLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  utilitySubLabel: {
    fontSize: 10,
    color: '#6C63FF',
    textAlign: 'center',
  },
  otherRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  otherItem: {
    width: '48%',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: '1%',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
  },
  otherLabel: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
});