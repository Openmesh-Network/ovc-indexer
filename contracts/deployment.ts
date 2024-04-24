export const deployment = {
  openRD: {
    openRD: { tasks: "0xDdb23dacd41908C4eAE03982B1c6529252A56b62" },
    openRDDaoExtensions: {
      taskDisputes: "0x945E13855cC61F33373Ec7D42eD30D800A832377",
      taskDrafts: "0x1DC2017f07a1996dA3F093c11570dE038088DCa4",
    },
    openRFP: { RFPs: "0x6Fa945AeaA0a5E80F79eff0BC06F0244412A3035" },
  },
  smartAccounts: {
    openmeshAdmin: { admin: "0x24496D746Fd003397790E41d0d1Ce61F4F7fd61f" },
    departments: {
      disputeDepartment: "0x7aC61b993B4aa460EDf7BC4266Ed4BBCa20bF2Db",
      coreMemberDepartment: "0x53773D0D0d71fc36cf403D886bc2eb3AC7F5fC24",
      expertDepartment: "0x5aC5C9eF579f70D307121a2Cf34Bf16807158A0e",
    },
  },
  tokennomics: {
    openToken: { openToken: "0x8477e2f07E6EB061027Bb15F703183453b776481" },
    validatorPass: {
      validatorPass: "0xDE327D1616465A79612D24215014459e7b1Ac202",
    },
    openClaiming: {
      ovcClaiming: "0x1D25F7b302159015486b001b0d2A5327744132dE",
      nodeClaiming: "0x50aB5e6176A0359E48Fe1f63245c3c4B8BF95724",
    },
  },
  departments: {
    verifiedContributor: {
      verifiedContributor: "0x5D69236b32dac44371d8CEA1f6bdC06427756Ac9",
    },
    verifiedContributorTagManager: "0x1E4FA7E3297174467FC688aefFbEA602D3594e97",
    verifiedContributorCountTrustlessManagement: "0x8f57296CB5b796E93aEAE358b760FEfdD2C5CCCD",
    verifiedContributorTagTrustlessManagement: "0x2018fEE841AB523B1dF4cD4E817D42de8bD08279",
    departmentDaos: {
      departmentFactory: {
        departmentFactory: "0x904e76EFA903cb705Bb1583e16a6e73EF69EAde9",
        departmentOwner: {
          dao: "0xe420e7028AF915F3C31c65E69918bA6850DE2e32",
          tokenVoting: "0xd84dd47d26fd5002f8F4e556F9f99632da62FDEb",
        },
      },
      smartAccountDepartmentInstaller: "0x04650A981d4423Cf1450e32DBd6e659406241a82",
      disputeDepartment: {
        dao: "0x8BB008F981e9411DB4A83188171B5B4d0a20e26E",
        tagVoting: "0x6b1FA2E156F323308311CE75781212A85f80E682",
      },
      coreMemberDepartment: {
        dao: "0x669820bea2104aBc9ab8dD77630eE0b19a7c25a8",
        tagVoting: "0x69750d3844d5494b723cd307867D7e28c6ABED7C",
      },
      expertDepartment: {
        dao: "0xB1047525C96101644Cd7877e4D52D9D1E4516Cf0",
        tagVoting: "0xa81238C6d6a8C7aA7Ed0f7A85889279ba47c9828",
      },
    },
  },
  crossChainDepartments: {
    disputeDepartment: "0x03628995BEDeb8E971C4bB96DB294A70396E1697",
    coreMemberDepartment: "0x691053Dd68c5B3CD7991d235f95f9801E24B100F",
    expertDepartment: "0x0B919a82515b56768d439AF1888D7A5C31379514",
  },
} as const;
