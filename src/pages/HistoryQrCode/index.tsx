import { yekretne } from '@/utils';
import { getKeyUri } from 'otp-io';
import { QRCodeSVG } from 'qrcode.react';

const HistoryQrCode = () => {
  const qrCodeUrl = getKeyUri({
    type: 'totp',
    secret: yekretne,
    name: 'faruxue',
    issuer: 'faruxue.top',
  });
  return (
    <div
      style={{
        margin: '0 auto',
        width: 600,
        textAlign: 'center',
        paddingTop: 24,
      }}
    >
      <QRCodeSVG value={qrCodeUrl} size={300} level={'L'} includeMargin={false} />
    </div>
  );
};

export default HistoryQrCode;
