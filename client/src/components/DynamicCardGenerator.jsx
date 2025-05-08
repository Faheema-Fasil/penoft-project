import React from 'react'
import cardbg from '../assets/cardbg.jpeg'
import { Button } from 'react-bootstrap'



function DynamicCardGenerator({ qrUrl, generateQR, captureRef, formData ,handleChange}) {
  // tidays date
  const today = new Date().toLocaleDateString();



  return (

    <>
      <div className=' p-5 w-auto h-fit'>

        <div className='custom-border p-4 d-flex flex-column gap-2'>
          <div ref={captureRef}>

            <div style={{ position: "relative" }}>

              <img src={cardbg} width={"360px"} height={"100%"} alt="" />

            </div>
            <div>

              {/* id */}
              <Button style={{ backgroundColor: "green", position: "absolute", top: "220px", right: "340px" }} className='d-flex align-items-center border-0 rounded-0'>
                <p className='text-white fs-6 fw-bold '>ID TVM0489</p>
              </Button>
              {/* details */}
              <div style={{ position: "absolute", top: "220px", right: "190px" }} className='d-flex flex-column justify-content-end align-items-end gap-0'>
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Uploaded"
                    width={100} height={100} style={{ borderRadius: "100%" }}
                  />
                ):
                <img
                src="data:image/png;base64,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"
                alt="Uploaded"
                width={100} height={100} style={{ borderRadius: "100%" }}
              />
                }
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSTQLezhAjhf515pGBYHvboyfK5BjmZ_RZQ&s"  alt="" /> */}
                <p className='text-primary mb-0 fw-bold'>{formData.name? formData.name:"YOUR NAME"}</p>
                <p style={{fontSize:"12px"}} className='text-dark mb-0 '>panchayat:{formData.panchayath?formData.panchayath:"Panchayat name"}</p>
                <p style={{fontSize:"12px"}} className='text-dark mb-0 '>{formData.district} district</p>
              </div>

              {qrUrl ? (
                <div className="mt-4 " style={{ position: "absolute", top: "430px", right: "140px" }}>
                  <img src={qrUrl} alt="QR Code" className='p-0 w-50' />
                  <p style={{ fontSize: "7px", color: "white", display: "flex", justifyItems: "start" }}>self issued date:{today} </p>

                </div>
              ) :
                <div className="mt-4 " style={{ position: "absolute", top: "440px", right: "200px" }}>
                  <Button onClick={generateQR} style={{
                    backgroundColor: "green", fontSize: "10px", margin: "0"
                  }}>
                    create QR
                  </Button>
                </div>}

            </div>
          </div>



          <Button style={{ backgroundColor: "green" }} size="lg" onClick={handleChange} >
            Live Preview
          </Button>
        </div>
        <div className='d-flex align-items-center justify-content-center mt-3'>
          <p>Drag and adjust image position inside box</p>
        </div>
      </div>
    </>
  )
}

export default DynamicCardGenerator
