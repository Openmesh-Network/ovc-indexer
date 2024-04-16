export const deployment = {
  openRD: {
    openRD: { tasks: "0x4436DF92364aBc450AfeC494ED492C2C9D713bc5" },
    openRDDaoExtensions: {
      taskDisputes: "0xb082d1323068ca6c123EB7eB94b104E0f83127DE",
      taskDrafts: "0xcA27dDccd950bD201630999B2Dd9CDDA9B429BEC",
    },
    openRFP: { RFPs: "0x8EB2eDCc549DDb73a3d6114a52936c069bD52400" },
  },
  smartAccounts: {
    openmeshAdmin: { admin: "0x3F70b483A5cc80cF6E80916621bF40A11081743D" },
    departments: {
      disputeDepartment: "0x6a956DaD77262E80a11dFE3277737Ac6d9469759",
      coreMemberDepartment: "0xB7f7315088EA8E0CFb7b2a46Ca6ca18ac1370A79",
      expertDepartment: "0x8765a0779c72C12C2e0Ce22fac3f21932C93088a",
    },
  },
  tokennomics: {
    openToken: { openToken: "0xd1275764CDe23bE2799AaadDac24a253396C69f3" },
    validatorPass: {
      validatorPass: "0xD9BefB58C0256cD662e3dC45a688F6d75eC485B0",
    },
    openmeshGenesis: {
      openmeshGenesis: "0x4050854BB53df4F39eE57Ce690bD3dE12a713C3a",
    },
    openClaiming: {
      ovcClaiming: "0xb986569be25DBB21bFe3459abdE483F398c95555",
      nodeClaiming: "0x05C0ee78CD4730dD81386d6F184486eF94Ba622a",
    },
  },
  departments: {
    verifiedContributor: {
      verifiedContributor: "0x8dEE881f3F6E0b65A06c2c2F8CF6bAc612aA84C7",
    },
    verifiedContributorTagManager: "0x6e80EDE1FfC56603098970a159b5794B34baD1aC",
    verifiedContributorCountTrustlessManagement: "0xD31827AB103E4067c19094D06B7b6FD3650922a3",
    verifiedContributorTagTrustlessManagement: "0x3A2A4C006a174FF3bC0913f8Df4d3De00CC90832",
    departmentDaos: {
      departmentFactory: {
        departmentFactory: "0x1F3fCCceC909050c452574C5A52168bf89e896A0",
        departmentOwner: {
          dao: "0x479811EE0FFf33Fc0e033eb4f2756Cc9c6A5313C",
          tokenVoting: "0x5B08305497fb3a087Fc582D45fcb648c98177c43",
        },
      },
      smartAccountDepartmentInstaller: "0x811737b560Cb769336f3188de8e2e5465107dA81",
      disputeDepartment: {
        dao: "0x1cFB33206C8e1e4eDc36212c919E4C867E627758",
        tagVoting: "0x9135fd90f8Ee5763A045e5b4561e289F817e8434",
      },
      coreMemberDepartment: {
        dao: "0x30D337E7EaC2d3fa5f980975D2b7B7693D6c5d45",
        tagVoting: "0x80EC8C4ab30fd448998E6a3350C4BF529Afea8C4",
      },
      expertDepartment: {
        dao: "0x9EcD8d9D90323Ea205C6b61797a6d35FBaFD6CbD",
        tagVoting: "0x443fC0ED84413820c75766d1524a259A87a97D47",
      },
    },
  },
  crossChainDepartments: {
    disputeDepartment: "0xeC140c160ff787536f1C172321a1932933c1f8C4",
    coreMemberDepartment: "0x46305688c41106Ae8711ab12EBf2C0d0eA714e5a",
    expertDepartment: "0x9459149E50153379D7EDb04dc37c7d5bA6112526",
  },
} as const;
