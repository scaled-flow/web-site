import React from 'react';
import { render } from '@testing-library/react';
import ClassCard from '../ClassCard'
import { Class } from '../ClassList'
import { BrowserRouter as Router } from 'react-router-dom'

const classData: Class = {
    "class_profile": {
      "class_desc": "To compete in a disruptive global market, every organization needs to deliver valuable technology solutions at the speed of business.",
      "class_title": "SAFe DevOps",
      "class_profile_id": 3,
      "class_image": "https://s3.us-east-2.amazonaws.com/www.testscaledflow.com/img/SAFe-5-Courseware-Thumbnails-SDP-343x400-2.png",
      "class_image_alt_text": "SAFe 5 Courseware icon"
    },
    "class_schedule": {
      "class_schedule_id": 1,
      "class_end_date": "2020-04-09",
      "class_end_time": "17:00:00",
      "class_in_person_city": "Bloomington",
      "class_in_person_state": "MN",
      "class_is_online": true,
      "class_start_date": "2020-04-06",
      "class_start_time": "09:00:00"
    },
    "consultant_profile": {
      "consultant_profile_user_id": 1,
      "profile_photo_url": "http://www.testscaledflow.com/static/media/network.86f4835b.jpg",
      "profile_photo_alt_text": "Network and power cables connected to a silver mesh covered server rack"
    }
  }

const isOnlineTextTest = "Testing"

test('loads Card', () => {
    const { container } = render(<Router><ClassCard classData={classData} isOnline={true} isOnlineText={isOnlineTextTest}/></Router>)
    expect(container).toBeDefined()
})

test('loads Card with Data', () => {
  const { container, getByText, getByAltText } = render(<Router><ClassCard classData={classData} isOnline={true} isOnlineText={isOnlineTextTest} /></Router>)

  // Confirm component loads with the class title present
  expect(getByText(`${classData.class_profile.class_title}`)).toBeTruthy()

  // Confirm component loads with alt text
  expect(getByAltText(`${classData.class_profile.class_image_alt_text ? classData.class_profile.class_image_alt_text : "class image"}`)).toBeTruthy()
  const image = container.querySelector('img')?.getAttribute('src')
  expect(image).toEqual(`${classData.class_profile.class_image}`)
})

