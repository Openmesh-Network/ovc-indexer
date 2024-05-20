export const deployment = {
  openRD: {
    openRD: { tasks: "0xDdb23dacd41908C4eAE03982B1c6529252A56b62" },
    openRDDaoExtensions: {
      taskDisputes: "0x945E13855cC61F33373Ec7D42eD30D800A832377",
      taskDrafts: "0x1DC2017f07a1996dA3F093c11570dE038088DCa4",
    },
    openRFP: { RFPs: "0x9687C4dcBf62f6D8400c17A3ec545C70b1a50A20" },
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
        departmentFactory: "0xb926c30B44490378CF2b77b72edf375c3cB97821",
        departmentOwner: {
          dao: "0x053a28A9Ffd76253379759df5e5b41466cD13804",
          tokenVoting: "0x0dD6602A3B5e717290af3e21B6Ea9645802fd828",
        },
      },
      smartAccountDepartmentInstaller: "0x04650A981d4423Cf1450e32DBd6e659406241a82",
      disputeDepartment: {
        dao: "0x821918F1e999DdE5CDF21f01Db7A8aC653870CDF",
        tagVoting: "0x6b1FA2E156F323308311CE75781212A85f80E682",
      },
      coreMemberDepartment: {
        dao: "0x36e72B6dB7b951C6C9B5A64c6dF04d91719ffd6A",
        tagVoting: "0x69750d3844d5494b723cd307867D7e28c6ABED7C",
      },
      expertDepartment: {
        dao: "0x592206A227Da7c8DBFA553b97B1f1f6E2E190C37",
        tagVoting: "0xa81238C6d6a8C7aA7Ed0f7A85889279ba47c9828",
      },
    },
  },
  crossChainDepartments: {
    disputeDepartment: "0xA651332Bf73905c326bdA4549A59c05Aa3bF7DA0",
    coreMemberDepartment: "0xE520f941def9FeA4BE3e616E8489e2eA1fe23DaB",
    expertDepartment: "0xd0Ec91D5389b63E4d1faa59269366233b4050235",
  },
} as const;
