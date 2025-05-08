import React from 'react'
import BarChart from '../components/BarChart'
import PiChart from '../components/PiChart'
import { Col, Row } from 'react-bootstrap'

function DashBoardPage() {
  return (
    < >


      <div className='custom-border py-4  my-2 bg-danger ' >
        <Row className='d-flex gap-5  justify-content-center'>
          <Col className='custom-border   ' style={{ maxWidth: "300px" }}>
            <PiChart  />
          </Col>
          <Col className='custom-border   ' style={{ maxWidth: "600px", maxHeight: "600px" }}>
            <BarChart />
          </Col>

        </Row>
        
      </div>
    </>
  )
}

export default DashBoardPage
