import { keccak256, toBytes } from "viem";
import { deployment } from "./deployment";

export const departments = [
  {
    name: "Dispute",
    description: "Openmesh OpenR&D Dispute Service Provider",
    tag: keccak256(toBytes("DISPUTE")),
    smart_account: deployment.smartAccounts.departments.disputeDepartment,
    crosschain_account: deployment.crossChainDepartments.disputeDepartment,
    dao: deployment.departments.departmentDaos.disputeDepartment,
  },
  {
    name: "Core Member",
    description: "Openmesh Core Member Team",
    tag: keccak256(toBytes("COREMEMBER")),
    smart_account: deployment.smartAccounts.departments.coreMemberDepartment,
    crosschain_account: deployment.crossChainDepartments.coreMemberDepartment,
    dao: deployment.departments.departmentDaos.coreMemberDepartment,
  },
] as const;
