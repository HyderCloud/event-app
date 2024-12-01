import React from 'react'

const Quotation = ({data}) => {
  return (
    <div className='flex bg-white flex-col h-full w-full' style={{color: 'black', gap: '10px'}}>
        <div className='req-header'>
        <div>בתקוף עד: {data?.offerExpiryDate}</div>
        <div>ניתן לבטל עד: {data?.cancellationDate}</div>
        </div>
        <div className='to-req flex flex-col'>
        <div>פרטי הלקוח</div>
        <div>שם: {data?.user?.name}</div>
        <div>אימייל: {data?.user?.email}</div>
        <div>טלפון: {data?.user?.phone}</div>
        </div>
        <div className='req-description flex flex-col' style={{textAlign: 'right'}}>
            <div>
                מהות העבודה
            </div>
            <div>
        {data?.description}
            </div>
        </div>    
        <div className='req-details flex flex-col' style={{textAlign: 'right'}}>
            <div>
                פרטי העבודה
            </div>
            <div>
        {data?.details}
            </div>
        </div>       
        <div className='req-description flex flex-col' style={{textAlign: 'right'}}>
            <div>
               היערות
            </div>
            <div>
        {data?.note}
            </div>
        </div>    
        <div className='req-prices flex flex-col' style={{textAlign: 'right'}}>
          <div>מחיר: {data?.price}</div>
        </div>    
        <div className='req-payment-methods flex flex-col' style={{textAlign: 'right'}}>
          <div>התשלום יתבצע באמצעות: {data?.paymentMethods}</div>
        </div>   
        <div className='req-starting-pay flex flex-col' style={{textAlign: 'right'}}>
          <div>מקדמה</div>
          <div>מועד תשלום: {data?.startDate}</div>
          <div>מחיר: {data?.paymentDataStart}</div>
        </div>   
        <div className='req-other-pay flex flex-col' style={{textAlign: 'right'}}>
            

                    {data?.paymentData?.map((item2,index2)=>{
            return(
                    <div className='flex flex-col' key={index2}>
                        <div>תשלום מס' {index2+1}</div> 
                <div className='flex flex-row'>
                <div>
                    מחיר: {item2}
                </div>
                <div>
                   מועד התשלום:  {data?.paymentDate[index2]}
                </div>
                </div>
                </div>
            )
        })}
        </div> 
        <div className='req-end-pay flex flex-col' style={{textAlign: 'right'}}>
          <div>תשלום סופי</div>
          <div>מועד תשלום: {data?.endDate}</div>
          <div>מחיר: {data?.paymentDataEnd}</div>
        </div>  
       
        <div className='req-signature flex flex-row' style={{textAlign: 'right'}}>
          <div className='flex flex-col'> 
            <div>חתימת העסק</div>
            <div   style={{backgroundImage:  `url(${data?.signature})`,
                        borderRadius: '15px',
                        backgroundSize: 'cover',
                        height: '100px',
                        width: '350px',
                        backgroundPosition: 'center'}}></div>
          </div>
          <div className='flex flex-col'> 
            <div>חתימת הלקוח</div>
            <div   style={{backgroundImage:  `url(${data?.signatureClient})`,
                        borderRadius: '15px',
                        backgroundSize: 'cover',
                        height: '100px',
                        width: '350px',
                        backgroundPosition: 'center'}}></div>
          </div>
        </div> 
    </div>
  )
}

export default Quotation