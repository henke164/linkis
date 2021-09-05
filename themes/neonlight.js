import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  statusBar: {
    backgroundColor: '#181E32',
  },
  headerStyle: {
    backgroundColor: '#071119',
    elevation: 0,
  },
  headerTitleStyle: {
    color: '#8492BB',
    fontSize: 14,
    alignSelf: 'center',
  },
  headerRight: {
    color: '#8492BB',
  },
  bottomNavBarStyle: {
    backgroundColor: '#181E32',
  },
  bottomNavBarActive: {
    color: '#fff',
    textShadowColor: '#adadad',
    textShadowRadius: 3,
    fontSize: 10,
  },
  bottomNavBarInactive: {
    color: '#607BC6',
  },
  view: {
    flex: 1,
    backgroundColor: '#071119',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 2,
    padding: 10,
    backgroundColor: '#161C2A',
    color: '#fff',
    textShadowColor: '#dadada',
    textShadowRadius: 2,
  },
  browserButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  inputPlaceHolder: {
    color: '#6B6F8B'
  },
  textHeaderFirst: {
    fontSize: 10,
    marginBottom: 15,
    color: '#7F87BB',
  },
  textHeader: {
    fontSize: 10,
    marginTop: 20,
    marginBottom: 10,
    color: '#7F87BB',
  },
  error: {
    marginTop: 12,
    fontSize: 12,
    color: 'red',
  },
  spinTypeWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  spinTypeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    marginBottom: 10,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  spinTypeHighlight: {
    borderBottomWidth: 3,
  },
  wheelDirectionButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  firstWheelDirectionButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastWheelDirectionButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  wheelDirectionButton:{
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexBasis: 33,
    borderWidth: 1,
    borderColor: '#222660',
  },
  highlight: {
    backgroundColor: '#222660',
  },
  highlightText: {
    color: '#fff',
    textShadowColor: '#adadad',
    textShadowRadius: 3,
    fontSize: 10,
  },
  blurred: {
  },
  blurredText: {
    color:'#607BC6',
    fontSize: 10,
  },
  button:{
    marginTop: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#222660',
    borderRadius: 5,
  },
  browserButton:{
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexBasis: 15,
    borderWidth: 1,
    borderColor: '#222660',
  },
  browserInput: {
    flexGrow: 1,
    flexBasis: 70,
    height: 40,
    borderRadius: 2,
    padding: 10,
    backgroundColor: '#161C2A',
    color: '#fff',
    textShadowColor: '#dadada',
    textShadowRadius: 2,
  },
  buttonText:{
    color: '#fff',
    textAlign:'center',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 12,
  },
  // History
  linkImage: {
    width: 75,
    height: 75,
  },
  linkRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#181E32',
    borderBottomWidth: 0.6,
    height: 80,
    marginBottom: 20,
  },
  linkText: {
    fontWeight: 'bold',
    paddingLeft: 20,
    color: 'white',
  },
  linkDateText: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 14,
    color: 'white',
  },
  linkDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#181E32',
    borderBottomWidth: 0.6,
    height: 80,
  },
  numberWrapper: {
    position: 'absolute',
    left: 10,
    top: 7.5,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 10,
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 10
  },
  spinTypeLabelWrapper: {
    position: 'absolute',
    right: 10,
    top: 7.5,
  },
  spinTypeLabel: {
    fontSize: 10,
    paddingHorizontal: 10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius: 10,
  },
  blackNumber: {
    color: '#68CAF2',
  },
  greenNumber: {
    color: '#63FFBF',
  },
  redNumber: {
    color: '#F591BC',
  }
});