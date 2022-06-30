// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

contract Vesting is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    IERC20Upgradeable public _token;

    bool internal _end;

    uint256 internal lock_duration;

    uint256[12] internal rate;

    using SafeERC20Upgradeable for IERC20Upgradeable;

    ///@dev no constructor in upgradable contracts. Instead we have initializers
    ///@param token address of diam
    function initialize(IERC20Upgradeable token) public initializer {
        ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Ownable_init();
        // __UUPSUpgradeable_init();
        _token = token;
        lock_duration = 31556916;
        rate = [uint256(10), 1, 3, 4, 5, 7, 8, 10, 11, 12, 14, 15];
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    struct VestingDetails {
        uint256 id;
        address beneficiary;
        uint256 amount;
        uint256 start_time;
        uint256 release_time;
        // uint256 recent_claim_at;
        bool status;
        uint256 pastInterval;
        uint256[12] vestingIntervals;
    }

    struct BeneficiaryDetails {
        uint256 id;
        uint256 count;
        uint256 lockedAmount;
        uint256 unlockedAmount;
    }

    VestingDetails[] public vestings;

    mapping(address => BeneficiaryDetails) public beneficiary_details;

    event BeneficiarySet(address indexed to, uint256 claim_id, uint256 amount);

    event released(address indexed to, uint256 claim_id, uint256 amount);

    function setBeneficiary(address beneficiary, uint256 amount)
        external
        onlyOwner
    {
        uint32 size;
        assembly {
            size := extcodesize(beneficiary)
        }
        require(size == 0, "SUPPORTS ONLY EOA ADDRESS");
        require(beneficiary_details[beneficiary].count == 0, "EXIST!");
        _token.safeTransferFrom(owner(), address(this), amount);

        vestings.push(
            VestingDetails(
                vestings.length, //0
                beneficiary, //
                amount,
                block.timestamp,
                block.timestamp + lock_duration,
                // 0,
                true,
                0,
                [
                    block.timestamp + 2629743,
                    block.timestamp + 5259486,
                    block.timestamp + 7889229,
                    block.timestamp + 10518972,
                    block.timestamp + 13148715,
                    block.timestamp + 15778458,
                    block.timestamp + 18408201,
                    block.timestamp + 21037944,
                    block.timestamp + 23667687,
                    block.timestamp + 26297430,
                    block.timestamp + 28927173,
                    block.timestamp + 31556916
                ]
            )
        );
        beneficiary_details[beneficiary].lockedAmount = amount;
        beneficiary_details[beneficiary].id = vestings.length - 1;
        beneficiary_details[beneficiary].count = 1;
        emit BeneficiarySet(beneficiary, vestings.length - 1, amount);
    }

    function release(uint256 id) external authorized(id) returns (bool) {
        require(id < vestings.length, "Invalid id");
        VestingDetails storage vesting_details = vestings[id];
        require(
            vesting_details.status == true,
            "All the tokens are released to the wallet"
        );
        require(
            block.timestamp >= vesting_details.vestingIntervals[0],
            "Vesting Interval not started"
        );
        uint256 _rate = 0;
        bool done;
        for (uint256 i = 0; i < 12; i++) {
            if (block.timestamp >= vesting_details.vestingIntervals[i]) {
                if (
                    vesting_details.pastInterval >=
                    vesting_details.vestingIntervals[i] ==
                    false
                ) {
                    _rate += rate[i];
                }
            } else {
                vesting_details.pastInterval = vesting_details.vestingIntervals[
                    i - 1
                ];
                break;
            }
        }
        uint256 claimed_amount = (vesting_details.amount * _rate) / 100;
        if (block.timestamp >= vesting_details.vestingIntervals[11]) {
            done = true;
        }
        return
            _releaseWithAmount(
                id,
                vesting_details.beneficiary,
                claimed_amount,
                done
            );
    }

    function _releaseWithAmount(
        uint256 id,
        address ben,
        uint256 claimed_amount,
        bool _d
    ) internal returns (bool) {
        if (claimed_amount > 0) {
            if (_d == true) {
                vestings[id].status = false;
                beneficiary_details[ben].count = 0;
            }
            _token.safeTransfer(ben, claimed_amount);
            beneficiary_details[ben].lockedAmount -= claimed_amount;
            beneficiary_details[ben].unlockedAmount += claimed_amount;
            emit released(ben, id, claimed_amount);
            return true;
        }
        return false;
    }

    modifier authorized(uint256 _id) {
        require(
            _msgSender() == owner() ||
                _msgSender() == vestings[_id].beneficiary,
            "caller is not the owner or Actual beneficiary"
        );
        _;
    }
}
