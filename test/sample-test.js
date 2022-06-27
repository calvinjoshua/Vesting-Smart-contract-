const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Vesting Contract", function () {

  var Diam
  var diam
  var Main
  var main
  var owner
  var addr1
  var addr2
  var addr3
  var addr4

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

  //Sample erc20 contract required before proceeding 

    Main = await ethers.getContractFactory("Vesting");
    //main = await Main.deploy(diam.address);
    main = await upgrades.deployProxy(Main, [diam.address], {
      initializer: "initialize",
    });
    await main.deployed();
  });


  it("Master check", async function () {


    await diam.transfer(addr1.address, "100000000000000000000000");
    await diam.connect(addr1).approve(main.address, "50000000000000000000000");
    await expect(main.setBeneficiary(addr1.address, "50000000000000000000000"))
      .to.emit(main, 'BeneficiarySet').withArgs(addr1.address, 0, "50000000000000000000000",);

    balanceofManager = await diam.balanceOf(main.address)
    console.log("balanceofManager", balanceofManager)
    expect(balanceofManager.toString()).to.equal("50000000000000000000000") 

    balanceofBen = await diam.balanceOf(addr1.address)
    console.log("balanceofBen", balanceofBen)
    expect(balanceofManager.toString()).to.equal("50000000000000000000000") 

    const twoMonths = 2629743 // + 2629743 //7 * 24 * 60 * 60;   1 2 /3

    await main.end()


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');

    await main.release(addr1.address,0);

    balanceofManagerAfter = await diam.balanceOf(main.address)
    //console.log("balanceofManagerAfter", balanceofManagerAfter) 

    balanceofBenAfter = await diam.balanceOf(addr1.address)
    //console.log("balanceofBenAfter", balanceofBenAfter)
    expect(balanceofManagerAfter.toString()).to.equal("45000000000000000000000") 

    expect(balanceofBenAfter.toString()).to.equal("55000000000000000000000")  


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    //console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    console.log("vestin 0 details afer", beneficStart2)
    // expect(balanceofManagerAfter.toString()).to.equal("44500000000000000000000")  // 1500
    // expect(balanceofBenAfter.toString()).to.equal("55500000000000000000000")  //5000000000000000000000


    await ethers.provider.send('evm_increaseTime', [twoMonths]);
    await ethers.provider.send('evm_mine');
    await main.release(addr1.address,0);
    balanceofManagerAfter = await diam.balanceOf(main.address)
    balanceofBenAfter = await diam.balanceOf(addr1.address)
    beneficStart2 =  await main.vestings(0)
    console.log("vestin 0 details afer", beneficStart2)
    expect(balanceofManagerAfter.toString()).to.equal("0")  // 1500
    expect(balanceofBenAfter.toString()).to.equal("100000000000000000000000")  //5000000000000000000000


    await expect(main.release(addr1.address,0))
    .to.be.revertedWith('All the tokens are released to the wallet');
    expect(balanceofManagerAfter.toString()).to.equal("0")  // 1500
    expect(balanceofBenAfter.toString()).to.equal("100000000000000000000000") 

    
  })

})
