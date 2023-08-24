// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {SmartWallet} from "./SmartWallet.sol";
import {SmartWalletProxy} from "./SmartWalletProxy.sol";

contract SmartWalletFactory is Ownable {
    address public immutable walletLogic;

    constructor(address _walletLogic) Ownable() {
        require(_walletLogic != address(0), "Zero address");

        walletLogic = _walletLogic;
    }

    function createSmartWallet(
        address entryPoint,
        address walletOwner,
        uint32 upgradeDelay,
        bytes32 salt
    ) external returns (SmartWallet) {
        address walletAddress = getWalletAddress(
            entryPoint,
            walletOwner,
            upgradeDelay,
            salt
        );

        uint256 codeSize = walletAddress.code.length;
        if (codeSize > 0) {
            return SmartWallet(payable(walletAddress));
        } else {
            SmartWallet wallet = SmartWallet(
                payable(
                    new SmartWalletProxy{salt: bytes32(salt)}(
                        walletLogic,
                        abi.encodeCall(
                            SmartWallet.initialize,
                            (entryPoint, walletOwner, upgradeDelay)
                        ),
                        walletOwner
                    )
                )
            );

            return wallet;
        }
    }

    function getWalletAddress(
        address entryPoint,
        address walletOwner,
        uint32 upgradeDelay,
        bytes32 salt
    ) public view returns (address) {
        bytes memory deploymentData = abi.encodePacked(
            type(SmartWalletProxy).creationCode,
            abi.encode(
                walletLogic,
                abi.encodeCall(
                    SmartWallet.initialize,
                    (entryPoint, walletOwner, upgradeDelay)
                )
            )
        );

        return Create2.computeAddress(bytes32(salt), keccak256(deploymentData));
    }
}
