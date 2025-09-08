
import { Teams } from '@/components/team';
  


const MembersPage = () => {

    return (
        <div>
            <h1>Members</h1>
            {/* Add your members page content here */}
            
            <div className="space-y-6 p-4">
                   <Teams/>
                    <img src="https://conferiotestbkt.s3.ap-south-1.amazonaws.com/users/34bca582-6118-4237-ba40-61d5a686d09b/305442df-454a-4208-8680-56f9f30a9194-25dd8fa37f25bcb2918b399625022d01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5TGDZJ7LRSYMDH7E%2F20250827%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250827T211654Z&X-Amz-Expires=3600&X-Amz-Signature=d6f9cfe50b835f55ec95ea0d5720dab7551fb7c6d9f456e094bdffad92c8c54a&X-Amz-SignedHeaders=host&response-content-disposition=inline&response-content-type=image%2Fjpeg&x-amz-checksum-mode=ENABLED&x-id=GetObject" alt="" />
                  </div>
        </div>
    );
};

export default MembersPage;