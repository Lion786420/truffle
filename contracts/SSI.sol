// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SSI {
    uint256 public docCount = 0;

    struct Document {
        uint256 id;
        string user_did;
        string name;
        string dob;
        string email;
        string phone;
        string permanentAddress;
        bool status;
    }

    mapping(uint256 => Document) public documents;

    function addDocument(
        string memory user_did,
        string memory name,
        string memory dob,
        string memory email,
        string memory phone,
        string memory permanentAddress
    ) public {
        documents[docCount] = Document(
            docCount,
            user_did,
            name,
            dob,
            email,
            phone,
            permanentAddress,
            false
        );
        docCount++;
    }

    function getDocCount() public view returns (uint256) {
        return docCount;
    }

    function getDocument(uint256 id)
        public
        view
        returns (
            string memory user_did,
            string memory name,
            string memory dob,
            string memory email,
            string memory phone,
            string memory permanentAddress,
            bool status
        )
    {
        Document memory doc = documents[id];
        return (
            doc.user_did,
            doc.name,
            doc.dob,
            doc.email,
            doc.phone,
            doc.permanentAddress,
            doc.status
        );
    }

    function verifyDocument(
        uint256 id,
        string memory user_did,
        string memory name,
        string memory dob,
        string memory email,
        string memory phone,
        string memory permanentAddress
    ) public {
        require(id < docCount, "Invalid document ID");
        Document storage doc = documents[id];
        
        doc.user_did = user_did;
        doc.name = name;
        doc.dob = dob;
        doc.email = email;
        doc.phone = phone;
        doc.permanentAddress = permanentAddress;
        doc.status = true;
    }

    function totalDocuments() public view returns (uint256) {
        return docCount;
    }

    function showAllDocs(string memory user_did)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory indices = new uint256[](docCount);
        uint256 count = 0;
        for (uint256 i = 0; i < docCount; i++) {
            if (
                keccak256(abi.encodePacked((documents[i].user_did))) ==
                keccak256(abi.encodePacked((user_did)))
            ) {
                indices[count] = i;
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = indices[i];
        }
        return result;
    }
}