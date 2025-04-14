// Main Menu Scene
class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    console.log('Preloading main menu assets...');
    this.load.image('menuBackground', 'assets/menuBackground.png');
    this.load.image('playButton', 'assets/playButton.png');
    this.load.image('menuTitle', 'assets/menuTitle.png');
  }

  create() {
    console.log('Creating main menu...');
    this.add.image(400, 300, 'menuBackground').setOrigin(0.5, 0.5).setDisplaySize(config.width, config.height);
    let menuTitle = this.add.image(400, 150, 'menuTitle');
    let scaleFactor = (config.width - 40) / menuTitle.width;
    menuTitle.setScale(scaleFactor*0.85);

    let playButton = this.add.image(400, 400, 'playButton').setInteractive();
    playButton.setScale(0.33);

    // Add hover effect
    playButton.on('pointerover', () => {
      playButton.setScale(0.35);  // Slightly increase size when hovering
    });

    playButton.on('pointerout', () => {
      playButton.setScale(0.33);  // Reset size when the hover ends
    });

    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}

// Game Scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    console.log('Preloading game assets...');
    this.load.image('table', 'assets/table.png');
    this.load.image('Customer1', 'assets/Customer1_Final.png');
    this.load.image('Customer2', 'assets/Customer2_Final.png');
    this.load.image('Customer3', 'assets/Customer3_Final.png');
    this.load.image('Customer4', 'assets/Customer4_Final.png');
    this.load.image('Customer5', 'assets/Customer5_Final.png');
    this.load.image('Customer6', 'assets/Customer6_Final.png');
    this.load.image('gameBackground', 'assets/gameBackground.png');
    this.load.image('notification', 'assets/notification.png');
    this.load.image('fulfilled', 'assets/fulfilled.png');
    this.load.spritesheet('player_down', 'assets/player_down2.png', { frameWidth: 32, frameHeight: 42 });
    this.load.spritesheet('player_up', 'assets/player_up2.png', { frameWidth: 32, frameHeight: 42 });
    this.load.spritesheet('player_left', 'assets/player_left2.png', { frameWidth: 32, frameHeight: 40 });
    this.load.spritesheet('player_right', 'assets/player_right2.png', { frameWidth: 32, frameHeight: 40 });
    this.load.image('closeButton', 'assets/closeButton.png');  // Close button asset
    this.load.image('submitButton', 'assets/submitButton.png');  // Submit button asset
    this.load.image('inventoryButton', 'assets/inventoryButton.png');  // Inventory button asset
    this.load.image('DetectorShop', 'assets/Detector_shop.png');  // Detector shop asset
    this.load.image('SignalShop', 'assets/Signal_shop.png');  // Signal shop asset
    this.load.image('PowerShop', 'assets/Power_shop.png');  // Power shop asset
    this.load.image('DAQShop', 'assets/DAQ_shop.png');  // DAQ shop asset
    this.load.image('DeployShop', 'assets/Deployment_shop.png');  // Deployment type shop asset
    this.load.image('FFShop', 'assets/Form_shop.png');  // Form factor shop asset
  }

  create() {
    console.log('Creating the player and tables...');
    this.playerSpeed = 350; //Original was 300
    this.isCustomer1MenuOpen = false; 
    this.isCustomer2MenuOpen = false;  
    this.isCustomer3MenuOpen = false;  
    this.isCustomer4MenuOpen = false;  
    this.isCustomer5MenuOpen = false;  
    this.isCustomer6MenuOpen = false;  
    this.isDetectorShopMenuOpen = false;  
    this.isPowerShopMenuOpen = false;  
    this.isSignalShopMenuOpen = false;  
    this.isDAQShopMenuOpen = false;  
    this.isDeployShopMenuOpen = false;  
    this.isFFShopMenuOpen = false;  
    this.isInventoryMenuOpen = false; // Flag for the inventory menu

    // Add background image for the game scene
    this.add.image(400, 300, 'gameBackground').setOrigin(0.5, 0.5).setDisplaySize(1600, config.height);

    // Make detector shop
    this.add.image(80, 240, 'DetectorShop').setOrigin(0.5, 0.5).setScale(0.15); 

    // Make signal shop
    this.add.image(80, 390, 'SignalShop').setOrigin(0.5, 0.5).setScale(0.15); 

    // Make power shop
    this.add.image(80, 540, 'PowerShop').setOrigin(0.5, 0.5).setScale(0.15); 

    // Make DAQ shop
    this.add.image(1120, 240, 'DAQShop').setOrigin(0.5, 0.5).setScale(0.15); 

    // Make deployment type shop
    this.add.image(1120, 390, 'DeployShop').setOrigin(0.5, 0.5).setScale(0.15); 

    // Make form factor shop
    this.add.image(1120, 540, 'FFShop').setOrigin(0.5, 0.5).setScale(0.15); 

    // Create animations for movement (down, up, left, right)
    this.anims.create({
      key: 'walkDown',
      frames: this.anims.generateFrameNumbers('player_down', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walkUp',
      frames: this.anims.generateFrameNumbers('player_up', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walkLeft',
      frames: this.anims.generateFrameNumbers('player_left', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walkRight',
      frames: this.anims.generateFrameNumbers('player_right', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // Create the cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys();

    this.Customer1Icon = null;       // Customer notification icon reference
    this.Customer2Icon = null;       // Customer notification icon reference
    this.Customer3Icon = null;       // Customer notification icon reference
    this.Customer4Icon = null;       // Customer notification icon reference
    this.Customer5Icon = null;       // Customer notification icon reference
    this.Customer6Icon = null;       // Customer notification icon reference
    this.Customer1Prompt = null;     // Customer notification prompt reference
    this.Customer2Prompt = null;     // Customer notification prompt reference
    this.Customer3Prompt = null;     // Customer notification prompt reference
    this.Customer4Prompt = null;     // Customer notification prompt reference
    this.Customer5Prompt = null;     // Customer notification prompt reference
    this.Customer6Prompt = null;     // Customer notification prompt reference
    this.DetectorShopPrompt = null; // Detector shop prompt reference
    this.SignalShopPrompt = null; // Signal shop prompt reference
    this.PowerShopPrompt = null; // Power shop prompt reference
    this.DAQShopPrompt = null; // DAQ shop prompt reference
    this.DeployShopPrompt = null; // Deploy shop prompt reference
    this.FFShopPrompt = null; // FF shop prompt reference

    // Add customers (2x3 grid in the center of the screen)
    let customerSpacing = 250;
    let startX = 350;
    let startY = 175;
    this.customers = [];
    let customerAssets = [
        'Customer1', 'Customer2', 'Customer3',
        'Customer4', 'Customer5', 'Customer6'
    ];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            // Calculate the index for the customer asset array
            let index = i * 2 + j;

            if (index < customerAssets.length) {
                let customer = this.physics.add.sprite(startX + i * customerSpacing, startY + j * customerSpacing, customerAssets[index]);
                customer.setScale(0.17);

                // Set the customer's physics body to use a circle for collisions
                customer.setOrigin(0.5, 0.5);
                let radius = (customer.width * 1) / 2;
                customer.body.setCircle(radius);
                customer.body.offset.x = 0;
                customer.body.offset.y = 0;

                customer.body.setImmovable(true);  // Make the customer static (immovable)
                this.customers.push(customer);
                //this.physics.add.collider(this.player, customer);
            }
        }
    }

    // Create the player sprite and add physics
    this.player = this.physics.add.sprite(100, 100, 'player_down');
    this.player.setScale(2.1); //was 4.5
    this.player.setCollideWorldBounds(true);

    for (let customer of this.customers) {
    this.physics.add.collider(this.player, customer)};  // Handle collisions now that the player is defined

    this.fulfilledOrdersCount = 0;

    this.isCustomer1Fulfilled = false;
    this.isCustomer2Fulfilled = false; 
    this.isCustomer3Fulfilled = false; 
    this.isCustomer4Fulfilled = false; 
    this.isCustomer5Fulfilled = false; 
    this.isCustomer6Fulfilled = false;  

    // Customer 1 Icon (Top-left table)
    let table1X = startX + 0 * customerSpacing;
    let table1Y = startY + 0 * customerSpacing;
    this.Customer1Icon = this.add.image(table1X - 12, table1Y - 85, 'notification').setScale(0.055);

    // Customer 2 Icon (Top-center table)
    let table2X = startX + 1 * customerSpacing;
    let table2Y = startY + 0 * customerSpacing;
    this.Customer2Icon = this.add.image(table2X - 12, table2Y - 85, 'notification').setScale(0.055);

    // Customer 3 Icon (Top-right table)
    let table3X = startX + 2 * customerSpacing;
    let table3Y = startY + 0 * customerSpacing;
    this.Customer3Icon = this.add.image(table3X - 12, table3Y - 85, 'notification').setScale(0.055);

    // Customer 4 Icon (Bottom-left table)
    let table4X = startX + 0 * customerSpacing;
    let table4Y = startY + 1 * customerSpacing;
    this.Customer4Icon = this.add.image(table4X - 12, table4Y - 85, 'notification').setScale(0.055);

    // Customer 5 Icon (Bottom-center table)
    let table5X = startX + 1 * customerSpacing;
    let table5Y = startY + 1 * customerSpacing;
    this.Customer5Icon = this.add.image(table5X - 12, table5Y - 85, 'notification').setScale(0.055);

    // Customer 6 Icon (Bottom-right table)
    let table6X = startX + 2 * customerSpacing;
    let table6Y = startY + 1 * customerSpacing;
    this.Customer6Icon = this.add.image(table6X - 12, table6Y - 85, 'notification').setScale(0.055);

    // Add a transparent box behind the customer notification prompt text
    this.Customer1PromptTextBox = this.add.graphics();
    this.Customer2PromptTextBox = this.add.graphics();
    this.Customer3PromptTextBox = this.add.graphics();
    this.Customer4PromptTextBox = this.add.graphics();
    this.Customer5PromptTextBox = this.add.graphics();
    this.Customer6PromptTextBox = this.add.graphics();

    // Customer 1
    this.Customer1Prompt = this.add.text(400, 550, 'Press [1] to talk!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);

    // Customer 2
    this.Customer2Prompt = this.add.text(400, 550, 'Press [2] to talk!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);

    // Customer 3
    this.Customer3Prompt = this.add.text(400, 550, 'Press [3] to talk!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);

    // Customer 4
    this.Customer4Prompt = this.add.text(400, 550, 'Press [4] to talk!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);

    // Customer 5
    this.Customer5Prompt = this.add.text(400, 550, 'Press [5] to talk!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);

    // Customer 6
    this.Customer6Prompt = this.add.text(400, 550, 'Press [6] to talk!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);


    // Initially hide the CustomerPrompt and background box
    this.Customer1Prompt.setAlpha(0);
    this.Customer2Prompt.setAlpha(0);
    this.Customer3Prompt.setAlpha(0);
    this.Customer4Prompt.setAlpha(0);
    this.Customer5Prompt.setAlpha(0);
    this.Customer6Prompt.setAlpha(0);
    this.Customer1PromptTextBox.setAlpha(0);
    this.Customer2PromptTextBox.setAlpha(0);
    this.Customer3PromptTextBox.setAlpha(0);
    this.Customer4PromptTextBox.setAlpha(0);
    this.Customer5PromptTextBox.setAlpha(0);
    this.Customer6PromptTextBox.setAlpha(0);

    ////////////////////////
    // Add a transparent box behind the detector shop prompt text
    this.DetectorShopPromptTextBox = this.add.graphics();
    this.DetectorShopPromptTextBox.fillStyle(0x000000, 0.5);  // Set black color with 50% transparency
    this.DetectorShopPromptTextBox.fillRect(225, 530, 345, 40);  // Box size and position

    // Add the DetectorShopPrompt text
    this.DetectorShopPrompt = this.add.text(400, 550, 'Press [Q] to pick a detector!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);

    // Initially hide the DetectorShopPrompt and background box
    this.DetectorShopPrompt.setAlpha(0);
    this.DetectorShopPromptTextBox.setAlpha(0);
    ///
    //Signal shop code
    this.SignalShopPromptTextBox = this.add.graphics();
    this.SignalShopPromptTextBox.fillStyle(0x000000, 0.5);  
    this.SignalShopPromptTextBox.fillRect(225, 530, 345, 40);
    this.SignalShopPrompt = this.add.text(400, 550, 'Press [W] to pick a signal collector!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);
    this.SignalShopPrompt.setAlpha(0);
    this.SignalShopPromptTextBox.setAlpha(0);
    ///
    //Power shop code
    this.PowerShopPromptTextBox = this.add.graphics();
    this.PowerShopPromptTextBox.fillStyle(0x000000, 0.5);  
    this.PowerShopPromptTextBox.fillRect(225, 530, 345, 40);
    this.PowerShopPrompt = this.add.text(400, 550, 'Press [E] to pick a power supply!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);
    this.PowerShopPrompt.setAlpha(0);
    this.PowerShopPromptTextBox.setAlpha(0);
    ///
    //DAQ shop code
    this.DAQShopPromptTextBox = this.add.graphics();
    this.DAQShopPromptTextBox.fillStyle(0x000000, 0.5);  
    this.DAQShopPromptTextBox.fillRect(225, 530, 345, 40);
    this.DAQShopPrompt = this.add.text(400, 550, 'Press [A] to pick a DAQ type!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);
    this.DAQShopPrompt.setAlpha(0);
    this.DAQShopPromptTextBox.setAlpha(0);
    ///
    //Deploy shop code
    this.DeployShopPromptTextBox = this.add.graphics();
    this.DeployShopPromptTextBox.fillStyle(0x000000, 0.5);  
    this.DeployShopPromptTextBox.fillRect(225, 530, 345, 40);
    this.DeployShopPrompt = this.add.text(400, 550, 'Press [S] to pick a deployment!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);
    this.DeployShopPrompt.setAlpha(0);
    this.DeployShopPromptTextBox.setAlpha(0);
    ///
    //FF shop code
    this.FFShopPromptTextBox = this.add.graphics();
    this.FFShopPromptTextBox.fillStyle(0x000000, 0.5);  
    this.FFShopPromptTextBox.fillRect(225, 530, 345, 40);
    this.FFShopPrompt = this.add.text(400, 550, 'Press [D] to pick a form factor!', {
      fontSize: '24px', 
      fill: '#FF0000',    // Red color
      stroke: '#000000',  // Black stroke (outline)
      strokeThickness: 4  // Thickness of the outline
    }).setOrigin(0.5, 0.5);
    this.FFShopPrompt.setAlpha(0);
    this.FFShopPromptTextBox.setAlpha(0);
    ///////////////////////
    
    // Set the world bounds to the new world size (1200px wide, 600px tall)
    this.physics.world.setBounds(0, 0, 1200, 600);

    // Adjust the camera to show the whole world
    this.cameras.main.setBounds(0, 0, 1200, 600);
    this.cameras.main.startFollow(this.player); // Follow the player as they move

    // Customer menu setup
    this.CustomerMenuBox = this.add.graphics();

    // Customer menu close buttons
    this.CustomerMenuCloseButton1 = this.add.image(0, 0, 'closeButton').setInteractive();
    this.CustomerMenuCloseButton1.setScale(0.050);
    this.CustomerMenuCloseButton1.on('pointerover', () => {this.CustomerMenuCloseButton1.setScale(0.055)});
    this.CustomerMenuCloseButton1.on('pointerout', () => {this.CustomerMenuCloseButton1.setScale(0.050)});
    this.CustomerMenuCloseButton1.on('pointerdown', this.closeCustomer1Menu, this);

    this.CustomerMenuCloseButton2 = this.add.image(0, 0, 'closeButton').setInteractive();
    this.CustomerMenuCloseButton2.setScale(0.050);
    this.CustomerMenuCloseButton2.on('pointerover', () => {this.CustomerMenuCloseButton2.setScale(0.055)});
    this.CustomerMenuCloseButton2.on('pointerout', () => {this.CustomerMenuCloseButton2.setScale(0.050)});
    this.CustomerMenuCloseButton2.on('pointerdown', this.closeCustomer2Menu, this);

    this.CustomerMenuCloseButton3 = this.add.image(0, 0, 'closeButton').setInteractive();
    this.CustomerMenuCloseButton3.setScale(0.050);
    this.CustomerMenuCloseButton3.on('pointerover', () => {this.CustomerMenuCloseButton3.setScale(0.055)});
    this.CustomerMenuCloseButton3.on('pointerout', () => {this.CustomerMenuCloseButton3.setScale(0.050)});
    this.CustomerMenuCloseButton3.on('pointerdown', this.closeCustomer3Menu, this);

    this.CustomerMenuCloseButton4 = this.add.image(0, 0, 'closeButton').setInteractive();
    this.CustomerMenuCloseButton4.setScale(0.050);
    this.CustomerMenuCloseButton4.on('pointerover', () => {this.CustomerMenuCloseButton4.setScale(0.055)});
    this.CustomerMenuCloseButton4.on('pointerout', () => {this.CustomerMenuCloseButton4.setScale(0.050)});
    this.CustomerMenuCloseButton4.on('pointerdown', this.closeCustomer4Menu, this);

    this.CustomerMenuCloseButton5 = this.add.image(0, 0, 'closeButton').setInteractive();
    this.CustomerMenuCloseButton5.setScale(0.050);
    this.CustomerMenuCloseButton5.on('pointerover', () => {this.CustomerMenuCloseButton5.setScale(0.055)});
    this.CustomerMenuCloseButton5.on('pointerout', () => {this.CustomerMenuCloseButton5.setScale(0.050)});
    this.CustomerMenuCloseButton5.on('pointerdown', this.closeCustomer5Menu, this);

    this.CustomerMenuCloseButton6 = this.add.image(0, 0, 'closeButton').setInteractive();
    this.CustomerMenuCloseButton6.setScale(0.050);
    this.CustomerMenuCloseButton6.on('pointerover', () => {this.CustomerMenuCloseButton6.setScale(0.055)});
    this.CustomerMenuCloseButton6.on('pointerout', () => {this.CustomerMenuCloseButton6.setScale(0.050)});
    this.CustomerMenuCloseButton6.on('pointerdown', this.closeCustomer6Menu, this);

    // Customer menu submit buttons
    this.submitButton1 = this.add.image(0, 0, 'submitButton').setInteractive();
    this.submitButton1.setScale(0.25);
    this.submitButton1.on('pointerover', () => {this.submitButton1.setScale(0.27)});
    this.submitButton1.on('pointerout', () => {this.submitButton1.setScale(0.25)});
    this.submitButton1.on('pointerdown', this.onSubmitButton1Click, this);

    this.submitButton2 = this.add.image(0, 0, 'submitButton').setInteractive();
    this.submitButton2.setScale(0.25); 
    this.submitButton2.on('pointerover', () => {this.submitButton2.setScale(0.27)});
    this.submitButton2.on('pointerout', () => {this.submitButton2.setScale(0.25)});
    this.submitButton2.on('pointerdown', this.onSubmitButton2Click, this);

    this.submitButton3 = this.add.image(0, 0, 'submitButton').setInteractive();
    this.submitButton3.setScale(0.25); 
    this.submitButton3.on('pointerover', () => {this.submitButton3.setScale(0.27)});
    this.submitButton3.on('pointerout', () => {this.submitButton3.setScale(0.25)});
    this.submitButton3.on('pointerdown', this.onSubmitButton3Click, this);

    this.submitButton4 = this.add.image(0, 0, 'submitButton').setInteractive();
    this.submitButton4.setScale(0.25); 
    this.submitButton4.on('pointerover', () => {this.submitButton4.setScale(0.27)});
    this.submitButton4.on('pointerout', () => {this.submitButton4.setScale(0.25)});
    this.submitButton4.on('pointerdown', this.onSubmitButton4Click, this);

    this.submitButton5 = this.add.image(0, 0, 'submitButton').setInteractive();
    this.submitButton5.setScale(0.25); 
    this.submitButton5.on('pointerover', () => {this.submitButton5.setScale(0.27)});
    this.submitButton5.on('pointerout', () => {this.submitButton5.setScale(0.25)});
    this.submitButton5.on('pointerdown', this.onSubmitButton5Click, this);

    this.submitButton6 = this.add.image(0, 0, 'submitButton').setInteractive();
    this.submitButton6.setScale(0.25); 
    this.submitButton6.on('pointerover', () => {this.submitButton6.setScale(0.27)});
    this.submitButton6.on('pointerout', () => {this.submitButton6.setScale(0.25)});
    this.submitButton6.on('pointerdown', this.onSubmitButton6Click, this);

    // Initially hide the customer menu box, submit button, and close button
    this.CustomerMenuBox.setAlpha(0);
    this.CustomerMenuCloseButton1.setAlpha(0);
    this.CustomerMenuCloseButton2.setAlpha(0);
    this.CustomerMenuCloseButton3.setAlpha(0);
    this.CustomerMenuCloseButton4.setAlpha(0);
    this.CustomerMenuCloseButton5.setAlpha(0);
    this.CustomerMenuCloseButton6.setAlpha(0);
    this.submitButton1.setAlpha(0);
    this.submitButton2.setAlpha(0);
    this.submitButton3.setAlpha(0);
    this.submitButton4.setAlpha(0);
    this.submitButton5.setAlpha(0);
    this.submitButton6.setAlpha(0);
    
    ///////////////////////
    // Detector shop menu setup
    this.DetectorShopMenuBox = this.add.graphics();
    this.DetectorShopMenuCloseButton = this.add.image(0, 0, 'closeButton').setInteractive();
    this.DetectorShopMenuCloseButton.setScale(0.050); // Scale the close button to X% size
    this.DetectorShopMenuCloseButton.on('pointerover', () => {this.DetectorShopMenuCloseButton.setScale(0.055)});
    this.DetectorShopMenuCloseButton.on('pointerout', () => {this.DetectorShopMenuCloseButton.setScale(0.050)});
    this.DetectorShopMenuCloseButton.on('pointerdown', this.closeDetectorShopMenu, this);
    this.DetectorShopMenuBox.setAlpha(0);
    this.DetectorShopMenuCloseButton.setAlpha(0);

    // Signal shop menu setup
    this.SignalShopMenuBox = this.add.graphics();
    this.SignalShopMenuCloseButton = this.add.image(0, 0, 'closeButton').setInteractive();
    this.SignalShopMenuCloseButton.setScale(0.050); // Scale the close button to X% size
    this.SignalShopMenuCloseButton.on('pointerover', () => {this.SignalShopMenuCloseButton.setScale(0.055)});
    this.SignalShopMenuCloseButton.on('pointerout', () => {this.SignalShopMenuCloseButton.setScale(0.050)});
    this.SignalShopMenuCloseButton.on('pointerdown', this.closeSignalShopMenu, this);
    this.SignalShopMenuBox.setAlpha(0);
    this.SignalShopMenuCloseButton.setAlpha(0);

    // Power shop menu setup
    this.PowerShopMenuBox = this.add.graphics();
    this.PowerShopMenuCloseButton = this.add.image(0, 0, 'closeButton').setInteractive();
    this.PowerShopMenuCloseButton.setScale(0.050); // Scale the close button to X% size
    this.PowerShopMenuCloseButton.on('pointerover', () => {this.PowerShopMenuCloseButton.setScale(0.055)});
    this.PowerShopMenuCloseButton.on('pointerout', () => {this.PowerShopMenuCloseButton.setScale(0.050)});
    this.PowerShopMenuCloseButton.on('pointerdown', this.closePowerShopMenu, this);
    this.PowerShopMenuBox.setAlpha(0);
    this.PowerShopMenuCloseButton.setAlpha(0);

    // DAQ shop menu setup
    this.DAQShopMenuBox = this.add.graphics();
    this.DAQShopMenuCloseButton = this.add.image(0, 0, 'closeButton').setInteractive();
    this.DAQShopMenuCloseButton.setScale(0.050); // Scale the close button to X% size
    this.DAQShopMenuCloseButton.on('pointerover', () => {this.DAQShopMenuCloseButton.setScale(0.055)});
    this.DAQShopMenuCloseButton.on('pointerout', () => {this.DAQShopMenuCloseButton.setScale(0.050)});
    this.DAQShopMenuCloseButton.on('pointerdown', this.closeDAQShopMenu, this);
    this.DAQShopMenuBox.setAlpha(0);
    this.DAQShopMenuCloseButton.setAlpha(0);

    // Deploy shop menu setup
    this.DeployShopMenuBox = this.add.graphics();
    this.DeployShopMenuCloseButton = this.add.image(0, 0, 'closeButton').setInteractive();
    this.DeployShopMenuCloseButton.setScale(0.050); // Scale the close button to X% size
    this.DeployShopMenuCloseButton.on('pointerover', () => {this.DeployShopMenuCloseButton.setScale(0.055)});
    this.DeployShopMenuCloseButton.on('pointerout', () => {this.DeployShopMenuCloseButton.setScale(0.050)});
    this.DeployShopMenuCloseButton.on('pointerdown', this.closeDeployShopMenu, this);
    this.DeployShopMenuBox.setAlpha(0);
    this.DeployShopMenuCloseButton.setAlpha(0);

    // FF shop menu setup
    this.FFShopMenuBox = this.add.graphics();
    this.FFShopMenuCloseButton = this.add.image(0, 0, 'closeButton').setInteractive();
    this.FFShopMenuCloseButton.setScale(0.050); // Scale the close button to X% size
    this.FFShopMenuCloseButton.on('pointerover', () => {this.FFShopMenuCloseButton.setScale(0.055)});
    this.FFShopMenuCloseButton.on('pointerout', () => {this.FFShopMenuCloseButton.setScale(0.050)});
    this.FFShopMenuCloseButton.on('pointerdown', this.closeFFShopMenu, this);
    this.FFShopMenuBox.setAlpha(0);
    this.FFShopMenuCloseButton.setAlpha(0);
    ///////////////////////
    
    // Inventory Button Setup (Top-right corner)
    this.inventoryButton = this.add.image(0, 0, 'inventoryButton').setInteractive();
    this.inventoryButton.setScale(0.13); // Adjust button size 0.25
    this.inventoryButton.on('pointerover', () => {
        this.inventoryButton.setScale(0.14);  // Slightly increase size when hovering
    });

    this.inventoryButton.on('pointerout', () => {
        this.inventoryButton.setScale(0.13);  // Reset size when hover ends
    });
    this.inventoryButton.on('pointerdown', this.showInventory, this);
    // Initially hide the inventory button in the game
    this.inventoryButton.setAlpha(1); 

    // Set up the inventory structure
    this.player.inventoryCategories = [
      { name: 'Detector', item: 'None' },
      { name: 'Signal Collection', item: 'None' },
      { name: 'Power Supply', item: 'None' },
      { name: 'Data Acquisition', item: 'None' },
      { name: 'Deployment', item: 'None' },
      { name: 'Form Factor', item: 'None' }
    ];
  }

  showCustomer1Menu() {
    this.isCustomer1MenuOpen = true; 
    this.player.setVelocity(0);  
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    this.CustomerMenuBox.clear();
    this.CustomerMenuBox.fillStyle(0x000000, 1.0);  // Dark background
    this.CustomerMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.CustomerMenuCloseButton1.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);
    this.submitButton1.setPosition(this.CustomerMenuCloseButton1.x - 120, this.CustomerMenuCloseButton1.y);
    this.customerOrder1 = {
        'Detector': 'NaI',
        'Signal Collection': 'PMT',
        'Power Supply': 'High',
        'Data Acquisition': 'None',
        'Deployment': 'None',
        'Form Factor': 'None'};
    this.orderdescriptionBox = this.add.graphics();
    this.orderdescriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.orderdescriptionBox.fillRect(boxX + 25, boxY + 75, boxWidth - 50, boxHeight - 200);
    this.orderdescriptionText1 = this.add.text(boxX + 50, boxY + 120, '', { fontSize: '18px', fill: '#000000', wordWrap: { width: boxWidth - 70} });
    const orderDescription = 'The system will be used for environmental monitoring applications. The nature of the work is otherwise classified so all that we will relay is that we are looking for a system that can manage to obtain good gamma ray spectroscopy data in a short amount of time. A dedicated motorized vehicle will be used with this system so a large volume will be necessary to make the most of the resources on hand. Due to other factors, budget is modest.\n' +
    'Hints:\n' +
    '• No DAQ method requested.\n' +
    '• No deployment type requested.\n' +
    '• No detector form factor requested.\n' +
    '• Three inventory items.';
    this.orderdescriptionText1.setText(orderDescription);
    this.CustomerMenuBox.setAlpha(1);
    this.CustomerMenuCloseButton1.setAlpha(1);
    this.submitButton1.setAlpha(1);
  };

  onSubmitButton1Click() {
    let isOrderMatched = true; // Assume the order is matched initially
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    for (let category in this.customerOrder1) {
        let playerItem = this.player.inventoryCategories.find(cat => cat.name === category)?.item;
        if (playerItem !== this.customerOrder1[category]) {
            isOrderMatched = false;
            break;
        }
    }
    let feedbackMessage = isOrderMatched ? 'Proposal Accepted!' : 'Plan not accpeted. Try again.';
    this.feedbackTextBox = this.add.graphics();
    this.feedbackTextBox.fillStyle(0x000000, 0.5);  // Set white color with 50% transparency
    this.feedbackTextBox.fillRect(boxX + boxWidth - 700, boxY + boxHeight - 65, 250, 40);  // Box size and position
    this.feedbackText = this.add.text(boxX + boxWidth - 685, boxY + boxHeight - 55, feedbackMessage, 
        { fontSize: '20px', fill: isOrderMatched ? '#00FF00' : '#FF0000' });
    if (isOrderMatched) {
      this.fulfilledOrdersCount++;
      this.isCustomer1Fulfilled = true;
      this.isCustomer1MenuOpen = false;
      this.CustomerMenuBox.setAlpha(0);
      this.CustomerMenuCloseButton1.setAlpha(0);
      this.submitButton1.setAlpha(0);
      this.orderdescriptionBox.setAlpha(0);
      this.orderdescriptionText1.setAlpha(0);
      this.Customer1Icon.setTexture('fulfilled').setScale(0.033);
      this.player.inventoryCategories.forEach(category => {
          category.item = "None"; // Reset the item to "None" for each inventory category
      });
     }
    this.time.delayedCall(1500, () => {
        this.feedbackText.setAlpha(0);
        this.feedbackTextBox.setAlpha(0);
    }, [], this);
  };

  closeCustomer1Menu() {
    this.isCustomer1MenuOpen = false;
    this.CustomerMenuBox.setAlpha(0);
    this.CustomerMenuCloseButton1.setAlpha(0);
    this.submitButton1.setAlpha(0);
    this.orderdescriptionBox.setAlpha(0);
    this.orderdescriptionText1.setAlpha(0);
  };

  showCustomer2Menu() {
    this.isCustomer2MenuOpen = true; 
    this.player.setVelocity(0);  
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    this.CustomerMenuBox.clear();
    this.CustomerMenuBox.fillStyle(0x000000, 1.0);  // Dark background
    this.CustomerMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.CustomerMenuCloseButton2.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);
    this.submitButton2.setPosition(this.CustomerMenuCloseButton2.x - 120, this.CustomerMenuCloseButton2.y);
    this.customerOrder2 = {
        'Detector': 'He-3',
        'Signal Collection': 'None',
        'Power Supply': 'High',
        'Data Acquisition': 'Online',
        'Deployment': 'Handheld',
        'Form Factor': 'Medium'};
    this.orderdescriptionBox = this.add.graphics();
    this.orderdescriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.orderdescriptionBox.fillRect(boxX + 25, boxY + 75, boxWidth - 50, boxHeight - 200);
    this.orderdescriptionText2 = this.add.text(boxX + 50, boxY + 120, '', { fontSize: '18px', fill: '#000000', wordWrap: { width: boxWidth - 70} });
    const orderDescription = 'I require a neutron detection system for use in reactor monitoring. The detectors will be used to monitor neutron flux so they should also be insensitive to gamma rays as much as possible. Operators will only be concerned with the counts so rapid detector output is necessary. The system will need to be constantly moved by personnel in the facility but do not make it so small that it ruins the efficiency. \n' +
    'Hints:\n' +
    '• DAQ method requested.\n' +
    '• Deployment type requested.\n' +
    '• Detector form factor requested.\n' +
    '• Five inventory items.';
    this.orderdescriptionText2.setText(orderDescription);
    this.CustomerMenuBox.setAlpha(1);
    this.CustomerMenuCloseButton2.setAlpha(1);
    this.submitButton2.setAlpha(1);
  };

  onSubmitButton2Click() {
    let isOrderMatched = true; // Assume the order is matched initially
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    for (let category in this.customerOrder2) {
        let playerItem = this.player.inventoryCategories.find(cat => cat.name === category)?.item;
        if (playerItem !== this.customerOrder2[category]) {
            isOrderMatched = false;
            break;
        }
    }
    let feedbackMessage = isOrderMatched ? 'Proposal Accepted!' : 'Plan not accpeted. Try again.';
    this.feedbackTextBox = this.add.graphics();
    this.feedbackTextBox.fillStyle(0x000000, 0.5);  // Set white color with 50% transparency
    this.feedbackTextBox.fillRect(boxX + boxWidth - 700, boxY + boxHeight - 65, 250, 40);  // Box size and position
    this.feedbackText = this.add.text(boxX + boxWidth - 685, boxY + boxHeight - 55, feedbackMessage, 
        { fontSize: '20px', fill: isOrderMatched ? '#00FF00' : '#FF0000' });
    if (isOrderMatched) {
      this.fulfilledOrdersCount++;
      this.isCustomer2Fulfilled = true;
      this.isCustomer2MenuOpen = false;
      this.CustomerMenuBox.setAlpha(0);
      this.CustomerMenuCloseButton2.setAlpha(0);
      this.submitButton2.setAlpha(0);
      this.orderdescriptionBox.setAlpha(0);
      this.orderdescriptionText2.setAlpha(0);
      this.Customer2Icon.setTexture('fulfilled').setScale(0.033);
      this.player.inventoryCategories.forEach(category => {
          category.item = "None"; // Reset the item to "None" for each inventory category
      });
     }
    this.time.delayedCall(1500, () => {
        this.feedbackText.setAlpha(0);
        this.feedbackTextBox.setAlpha(0);
    }, [], this);
  };

  closeCustomer2Menu() {
    this.isCustomer2MenuOpen = false;
    this.CustomerMenuBox.setAlpha(0);
    this.CustomerMenuCloseButton2.setAlpha(0);
    this.submitButton2.setAlpha(0);
    this.orderdescriptionBox.setAlpha(0);
    this.orderdescriptionText2.setAlpha(0);
  };

  showCustomer3Menu() {
    this.isCustomer3MenuOpen = true; 
    this.player.setVelocity(0);  
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    this.CustomerMenuBox.clear();
    this.CustomerMenuBox.fillStyle(0x000000, 1.0);  // Dark background
    this.CustomerMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.CustomerMenuCloseButton3.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);
    this.submitButton3.setPosition(this.CustomerMenuCloseButton3.x - 120, this.CustomerMenuCloseButton3.y);
    this.customerOrder3 = {
        'Detector': 'Plastic',
        'Signal Collection': 'None',
        'Power Supply': 'None',
        'Data Acquisition': 'None',
        'Deployment': 'None',
        'Form Factor': 'None'};
    this.orderdescriptionBox = this.add.graphics();
    this.orderdescriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.orderdescriptionBox.fillRect(boxX + 25, boxY + 75, boxWidth - 50, boxHeight - 200);
    this.orderdescriptionText3 = this.add.text(boxX + 50, boxY + 120, '', { fontSize: '18px', fill: '#000000', wordWrap: { width: boxWidth - 70} });
    const orderDescription = 'I am only looking for an affordable detector material that can replace a liquid-based detector volume that is currently in use at a radiation portal monitor. The detector needs to take up the same space as several liters for the current setup to work correctly. \n' +
    'Hints:\n' +
    '• No DAQ method requested.\n' +
    '• No deployment type requested.\n' +
    '• No detector form factor requested.\n' +
    '• One inventory item.';
    this.orderdescriptionText3.setText(orderDescription);
    this.CustomerMenuBox.setAlpha(1);
    this.CustomerMenuCloseButton3.setAlpha(1);
    this.submitButton3.setAlpha(1);
  };

  onSubmitButton3Click() {
    let isOrderMatched = true; // Assume the order is matched initially
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    for (let category in this.customerOrder3) {
        let playerItem = this.player.inventoryCategories.find(cat => cat.name === category)?.item;
        if (playerItem !== this.customerOrder3[category]) {
            isOrderMatched = false;
            break;
        }
    }
    let feedbackMessage = isOrderMatched ? 'Proposal Accepted!' : 'Plan not accpeted. Try again.';
    this.feedbackTextBox = this.add.graphics();
    this.feedbackTextBox.fillStyle(0x000000, 0.5);  // Set white color with 50% transparency
    this.feedbackTextBox.fillRect(boxX + boxWidth - 700, boxY + boxHeight - 65, 250, 40);  // Box size and position
    this.feedbackText = this.add.text(boxX + boxWidth - 685, boxY + boxHeight - 55, feedbackMessage, 
        { fontSize: '20px', fill: isOrderMatched ? '#00FF00' : '#FF0000' });
    if (isOrderMatched) {
      this.fulfilledOrdersCount++;
      this.isCustomer3Fulfilled = true;
      this.isCustomer3MenuOpen = false;
      this.CustomerMenuBox.setAlpha(0);
      this.CustomerMenuCloseButton3.setAlpha(0);
      this.submitButton3.setAlpha(0);
      this.orderdescriptionBox.setAlpha(0);
      this.orderdescriptionText3.setAlpha(0);
      this.Customer3Icon.setTexture('fulfilled').setScale(0.033);
      this.player.inventoryCategories.forEach(category => {
          category.item = "None"; // Reset the item to "None" for each inventory category
      });
     }
    this.time.delayedCall(1500, () => {
        this.feedbackText.setAlpha(0);
        this.feedbackTextBox.setAlpha(0);
    }, [], this);
  };

  closeCustomer3Menu() {
    this.isCustomer3MenuOpen = false;
    this.CustomerMenuBox.setAlpha(0);
    this.CustomerMenuCloseButton3.setAlpha(0);
    this.submitButton3.setAlpha(0);
    this.orderdescriptionBox.setAlpha(0);
    this.orderdescriptionText3.setAlpha(0);
  };

  showCustomer4Menu() {
    this.isCustomer4MenuOpen = true; 
    this.player.setVelocity(0);  
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    this.CustomerMenuBox.clear();
    this.CustomerMenuBox.fillStyle(0x000000, 1.0);  // Dark background
    this.CustomerMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.CustomerMenuCloseButton4.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);
    this.submitButton4.setPosition(this.CustomerMenuCloseButton4.x - 120, this.CustomerMenuCloseButton4.y);
    this.customerOrder4 = {
        'Detector': 'HPGe',
        'Signal Collection': 'None',
        'Power Supply': 'High',
        'Data Acquisition': 'Offline',
        'Deployment': 'Fixed',
        'Form Factor': 'None'};
    this.orderdescriptionBox = this.add.graphics();
    this.orderdescriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.orderdescriptionBox.fillRect(boxX + 25, boxY + 75, boxWidth - 50, boxHeight - 200);
    this.orderdescriptionText4 = this.add.text(boxX + 50, boxY + 120, '', { fontSize: '18px', fill: '#000000', wordWrap: { width: boxWidth - 70} });
    const orderDescription = 'We are setting up a forensics station near a port of entry and thus need to best possible detection system for gamma ray spectroscopy. The system will be housed in a secure facility and should not have to be moved. Only the raw data is required since other personnel will need access to the data for further analysis. \n' +
    'Hints:\n' +
    '• DAQ method requested.\n' +
    '• Deployment type requested.\n' +
    '• No detector form factor requested.\n' +
    '• Four inventory items.';
    this.orderdescriptionText4.setText(orderDescription);
    this.CustomerMenuBox.setAlpha(1);
    this.CustomerMenuCloseButton4.setAlpha(1);
    this.submitButton4.setAlpha(1);
  };

  onSubmitButton4Click() {
    let isOrderMatched = true; // Assume the order is matched initially
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    for (let category in this.customerOrder4) {
        let playerItem = this.player.inventoryCategories.find(cat => cat.name === category)?.item;
        if (playerItem !== this.customerOrder4[category]) {
            isOrderMatched = false;
            break;
        }
    }
    let feedbackMessage = isOrderMatched ? 'Proposal Accepted!' : 'Plan not accpeted. Try again.';
    this.feedbackTextBox = this.add.graphics();
    this.feedbackTextBox.fillStyle(0x000000, 0.5);  // Set white color with 50% transparency
    this.feedbackTextBox.fillRect(boxX + boxWidth - 700, boxY + boxHeight - 65, 250, 40);  // Box size and position
    this.feedbackText = this.add.text(boxX + boxWidth - 685, boxY + boxHeight - 55, feedbackMessage, 
        { fontSize: '20px', fill: isOrderMatched ? '#00FF00' : '#FF0000' });
    if (isOrderMatched) {
      this.fulfilledOrdersCount++;
      this.isCustomer4Fulfilled = true;
      this.isCustomer4MenuOpen = false;
      this.CustomerMenuBox.setAlpha(0);
      this.CustomerMenuCloseButton4.setAlpha(0);
      this.submitButton4.setAlpha(0);
      this.orderdescriptionBox.setAlpha(0);
      this.orderdescriptionText4.setAlpha(0);
      this.Customer4Icon.setTexture('fulfilled').setScale(0.033);
      this.player.inventoryCategories.forEach(category => {
          category.item = "None"; // Reset the item to "None" for each inventory category
      });
     }
    this.time.delayedCall(1500, () => {
        this.feedbackText.setAlpha(0);
        this.feedbackTextBox.setAlpha(0);
    }, [], this);
  };

  closeCustomer4Menu() {
    this.isCustomer4MenuOpen = false;
    this.CustomerMenuBox.setAlpha(0);
    this.CustomerMenuCloseButton4.setAlpha(0);
    this.submitButton4.setAlpha(0);
    this.orderdescriptionBox.setAlpha(0);
    this.orderdescriptionText4.setAlpha(0);
  };

  showCustomer5Menu() {
    this.isCustomer5MenuOpen = true; 
    this.player.setVelocity(0);  
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    this.CustomerMenuBox.clear();
    this.CustomerMenuBox.fillStyle(0x000000, 1.0);  // Dark background
    this.CustomerMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.CustomerMenuCloseButton5.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);
    this.submitButton5.setPosition(this.CustomerMenuCloseButton5.x - 120, this.CustomerMenuCloseButton5.y);
    this.customerOrder5 = {
        'Detector': 'Stilbene',
        'Signal Collection': 'SiPM',
        'Power Supply': 'Low',
        'Data Acquisition': 'Online',
        'Deployment': 'Hybrid',
        'Form Factor': 'Small'};
    this.orderdescriptionBox = this.add.graphics();
    this.orderdescriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.orderdescriptionBox.fillRect(boxX + 25, boxY + 75, boxWidth - 50, boxHeight - 200);
    this.orderdescriptionText5 = this.add.text(boxX + 50, boxY + 120, '', { fontSize: '18px', fill: '#000000', wordWrap: { width: boxWidth - 70} });
    const orderDescription = 'We require a neutron imaging detector system that is as compact and portable as possible. The system should be capable of doing measurements while left unattended or carried by an operator. Since it will be used for source localization, it should also be able to provide operators with near real-time information. \n' +
    'Hints:\n' +
    '• DAQ method requested.\n' +
    '• Deployment type requested.\n' +
    '• Detector form factor requested.\n' +
    '• Six inventory items.';
    this.orderdescriptionText5.setText(orderDescription);
    this.CustomerMenuBox.setAlpha(1);
    this.CustomerMenuCloseButton5.setAlpha(1);
    this.submitButton5.setAlpha(1);
  };

  onSubmitButton5Click() {
    let isOrderMatched = true; // Assume the order is matched initially
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;
    for (let category in this.customerOrder5) {
        let playerItem = this.player.inventoryCategories.find(cat => cat.name === category)?.item;
        if (playerItem !== this.customerOrder5[category]) {
            isOrderMatched = false;
            break;
        }
    }
    let feedbackMessage = isOrderMatched ? 'Proposal Accepted!' : 'Plan not accpeted. Try again.';
    this.feedbackTextBox = this.add.graphics();
    this.feedbackTextBox.fillStyle(0x000000, 0.5);  // Set white color with 50% transparency
    this.feedbackTextBox.fillRect(boxX + boxWidth - 700, boxY + boxHeight - 65, 250, 40);  // Box size and position
    this.feedbackText = this.add.text(boxX + boxWidth - 685, boxY + boxHeight - 55, feedbackMessage, 
        { fontSize: '20px', fill: isOrderMatched ? '#00FF00' : '#FF0000' });
    if (isOrderMatched) {
      this.fulfilledOrdersCount++;
      this.isCustomer5Fulfilled = true;
      this.isCustomer5MenuOpen = false;
      this.CustomerMenuBox.setAlpha(0);
      this.CustomerMenuCloseButton5.setAlpha(0);
      this.submitButton5.setAlpha(0);
      this.orderdescriptionBox.setAlpha(0);
      this.orderdescriptionText5.setAlpha(0);
      this.Customer5Icon.setTexture('fulfilled').setScale(0.033);
      this.player.inventoryCategories.forEach(category => {
          category.item = "None"; // Reset the item to "None" for each inventory category
      });
     }
    this.time.delayedCall(1500, () => {
        this.feedbackText.setAlpha(0);
        this.feedbackTextBox.setAlpha(0);
    }, [], this);
  };

  closeCustomer5Menu() {
    this.isCustomer5MenuOpen = false;
    this.CustomerMenuBox.setAlpha(0);
    this.CustomerMenuCloseButton5.setAlpha(0);
    this.submitButton5.setAlpha(0);
    this.orderdescriptionBox.setAlpha(0);
    this.orderdescriptionText5.setAlpha(0);
  };

  showCustomer6Menu() {
    this.isCustomer6MenuOpen = true; // Open the customer menu
    this.player.setVelocity(0);     // Stop the player when the menu is open

    // Use the camera view to calculate position and size of the menu box
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;

    this.CustomerMenuBox.clear();
    this.CustomerMenuBox.fillStyle(0x000000, 1.0);  // Dark background
    this.CustomerMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Create a close button for the customer menu
    this.CustomerMenuCloseButton6.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);

    // Create a submit button
    this.submitButton6.setPosition(this.CustomerMenuCloseButton6.x - 120, this.CustomerMenuCloseButton6.y); // Adjust the position, was 60

    // Customer's order (example)
    this.customerOrder6 = {
        'Detector': 'None',
        'Signal Collection': 'GM Tube',
        'Power Supply': 'Medium',
        'Data Acquisition': 'None',
        'Deployment': 'None',
        'Form Factor': 'None'};

    this.orderdescriptionBox = this.add.graphics();
    this.orderdescriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.orderdescriptionBox.fillRect(boxX + 25, boxY + 75, boxWidth - 50, boxHeight - 200);
    this.orderdescriptionText6 = this.add.text(boxX + 50, boxY + 120, '', { fontSize: '18px', fill: '#000000', wordWrap: { width: boxWidth - 70} });

    const orderDescription = 'I am looking for a detection setup that is minimalistic. I just want to monitor radiation levels in one of our warehouses. I do not need energy information either.\n' +
    'Hints:\n' +
    '• No DAQ method requested.\n' +
    '• No deployment type requested.\n' +
    '• No detector form factor requested.\n' +
    '• Two inventory items.';

    this.orderdescriptionText6.setText(orderDescription);
    //

    // Make everything visible
    this.CustomerMenuBox.setAlpha(1);
    this.CustomerMenuCloseButton6.setAlpha(1);
    this.submitButton6.setAlpha(1);
  };

  onSubmitButton6Click() {
    let isOrderMatched = true; // Assume the order is matched initially

    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;

    // Check if the player's inventory matches the customer's order
    for (let category in this.customerOrder6) {
        let playerItem = this.player.inventoryCategories.find(cat => cat.name === category)?.item;
        
        if (playerItem !== this.customerOrder6[category]) {
            isOrderMatched = false;
            break;
        }
    }

    // Display feedback based on whether the order matched
    let feedbackMessage = isOrderMatched ? 'Proposal Accepted!' : 'Plan not accpeted. Try again.';

    this.feedbackTextBox = this.add.graphics();
    this.feedbackTextBox.fillStyle(0x000000, 0.5);  // Set white color with 50% transparency
    this.feedbackTextBox.fillRect(boxX + boxWidth - 700, boxY + boxHeight - 65, 250, 40);  // Box size and position

    // Show feedback text
    this.feedbackText = this.add.text(boxX + boxWidth - 685, boxY + boxHeight - 55, feedbackMessage, 
        { fontSize: '20px', fill: isOrderMatched ? '#00FF00' : '#FF0000' });

    if (isOrderMatched) {
      this.fulfilledOrdersCount++; // Increment the fulfilled orders counter
      this.isCustomer6Fulfilled = true;
      this.isCustomer6MenuOpen = false; // Close the customer menu
      this.CustomerMenuBox.setAlpha(0);
      this.CustomerMenuCloseButton6.setAlpha(0);
      this.submitButton6.setAlpha(0);
      this.orderdescriptionBox.setAlpha(0);
      this.orderdescriptionText6.setAlpha(0);

      // Change the notification icon to a "fulfilled" icon (happy face)
      this.Customer6Icon.setTexture('fulfilled').setScale(0.033);

      // Reset the player inventory to "None" after successful order submission
      this.player.inventoryCategories.forEach(category => {
          category.item = "None"; // Reset the item to "None" for each inventory category
      });
     }

    // Optionally, you can hide the feedback after some time
    this.time.delayedCall(1500, () => {
        this.feedbackText.setAlpha(0);
        this.feedbackTextBox.setAlpha(0);
    }, [], this);
  };

  closeCustomer6Menu() {
    this.isCustomer6MenuOpen = false; // Close the customer menu

    // Hide the customer menu elements
    this.CustomerMenuBox.setAlpha(0);
    this.CustomerMenuCloseButton6.setAlpha(0);
    this.submitButton6.setAlpha(0);
    this.orderdescriptionBox.setAlpha(0);
    this.orderdescriptionText6.setAlpha(0);
  };

//////////////////////////////

  showDetectorShopMenu() {
    this.isDetectorShopMenuOpen = true; // Set the menu to open, preventing movement
    this.player.setVelocity(0); // Stop the player immediately when the menu is opened

    // Use the camera view to calculate position and size of the menu box
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25; // 25 pixels offset from the left of the camera view
    let boxY = camera.worldView.y + 25; // 25 pixels offset from the top of the camera view
    let boxWidth = 750; // Width of the menu box
    let boxHeight = 550; // Height of the menu box

    // Draw the menu box based on the camera's view
    this.DetectorShopMenuBox.clear();
    this.DetectorShopMenuBox.fillStyle(0x000000, 1.0); // Dark background with full opacity
    this.DetectorShopMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.DetectorShopTitleText = this.add.text(boxX + boxWidth / 2, boxY + 20, 'Detector Options', { fontSize: '32px', fill: '#FFFFFF' }).setOrigin(0.5, 0);
    // Position the close button at the bottom right of the menu box
    this.DetectorShopMenuCloseButton.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50); // Adjust position

    // Create buttons for detector options and store them in this.detectorButtons
    const detectorOptions = ['Plastic', 'NaI', 'Stilbene', 'He-3', 'HPGe', 'None'];
    const detectorDescriptions = {
        'Plastic': '[Type: Scintillator]\nPlastic detectors are sensitive to both gamma rays and neutrons. Due to being relatively inexpensive, plastics can be made into large volume detectors of various shapes. Gamma ray full energy deposition can be feasible with this detector type when doped with other material.',
        'NaI': '[Type: Scintillator]\nSodium Iodide (NaI) detectors are widely used in gamma spectroscopy (study of the energy spectra) due to ability to have gamma ray full energy depositions in the detector. Due to being a traditionally used detector, can be obtained in large quantities for an affordable amount.',
        'Stilbene': '[Type: Scintillator]\nStilbene detectors offer both gamma ray and fast neutron detection capabilities. This organic crystalline detector is the gold standard for particle discrimination capabilities. Gamma ray full energy deposition is not feasible with this detector type. Typically more expensive than plastics and NaI',
        'He-3': '[Type: Gas]\nHelium-3 detectors are gas-based systems are used for thermal neutron detection. Largely insensitive to gamma rays. Due to requiring moderation of neutrons for effective detection, energy information of source particles is lost. Due to the dwindling of global He-3 supplies, these detectors are often expensive. Do not require additional signal collection systems. Will need high voltages for power',
        'HPGe': '[Type: Semiconductor]\nHigh-purity germanium (HPGe) detectors provide the best energy resolution for gamma ray energy spectral analysis. Must be operated at extremely low temperatures, thus requiring additional auxiliary cooling equipment and high power. HPGe systems are among the most expensive on the market. Do not require additional signal collection systems.',
        'None': 'Selecting no detector option.'};

    this.detectorButtons = []; // Initialize the array to store references to the buttons
    this.selectedButton = null; // Variable to keep track of the selected button

    // Create a description text box on the right side of the menu box
    this.descriptionBox = this.add.graphics();
    this.descriptionBox.fillStyle(0xA9A9A9, 1.0); // White background
    this.descriptionBox.fillRect(boxX + boxWidth - 350, boxY + 100, 320, boxHeight - 200); // Position it on the right side
    this.descriptionText = this.add.text(boxX + boxWidth - 340, boxY + 120, '', { fontSize: '16px', fill: '#000000', wordWrap: { width: 300 } });

    // Define the button's Y-position based on the box's Y position and some spacing
    const buttonSpacing = 50;
    let buttonY = boxY + 100;

    detectorOptions.forEach((option, index) => {
        let button = this.add.text(boxX + 50, buttonY, option, { fontSize: '20px', fill: '#FFFFFF' })
            .setInteractive()
            .on('pointerdown', () => this.selectDetector(option, button)) // Attach selectDetector callback
            .on('pointerover', () => {
                button.setStyle({ fill: '#FF0000' }); // Change color on hover
                // Update the description box with the corresponding text
                this.descriptionText.setText(detectorDescriptions[option]);
                this.descriptionBox.setAlpha(1); // Make description box visible
            })
            .on('pointerout', () => {
                if (this.selectedButton !== button) {  // Keep green color for selected button
                    button.setStyle({ fill: '#FFFFFF' }); // Reset color when hover ends
                }
                // Hide the description box when no button is hovered
                this.descriptionBox.setAlpha(0);
            });

        // Store the button reference for later hiding
        this.detectorButtons.push(button);

        // Adjust the Y-position for the next button
        buttonY += buttonSpacing;
    });

    // Make the menu, submit button, and close button visible
    this.DetectorShopMenuBox.setAlpha(1);
    this.DetectorShopMenuCloseButton.setAlpha(1);
  }

  selectDetector(selectedDetector, selectedButton) {
    // Find the Detector category in the inventoryCategories array
    const detectorCategory = this.player.inventoryCategories.find(category => category.name === 'Detector');

    // If the Detector category exists, update its item
    if (detectorCategory) {
        detectorCategory.item = selectedDetector;
    } else {
        // If for some reason the 'Detector' category doesn't exist, log an error or create it
        console.error('Detector category not found in inventoryCategories.');
    }

    // If a button was previously selected, reset its color to white
    if (this.selectedButton) {
        this.selectedButton.setStyle({ fill: '#FFFFFF' });
    }

    // Highlight the selected button by changing its color to green
    selectedButton.setStyle({ fill: '#00FF00' });

    // Update the selectedButton reference
    this.selectedButton = selectedButton;
  }

  closeDetectorShopMenu() {
    this.isDetectorShopMenuOpen = false;

    // Hide the menu elements
    this.DetectorShopMenuBox.setAlpha(0);
    this.DetectorShopMenuCloseButton.setAlpha(0);
    this.DetectorShopTitleText.setAlpha(0);
    this.detectorButtons.forEach(button => {
        button.setAlpha(0); // Hide each button
    });
    this.descriptionBox.setAlpha(0);
    this.descriptionText.setAlpha(0);
    // Reset the selectedButton so the color reset is handled the next time
    this.selectedButton = null;
  }

//////////////////////////////

  showSignalShopMenu() {
    this.isSignalShopMenuOpen = true;
    this.player.setVelocity(0); 

    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25; 
    let boxY = camera.worldView.y + 25; 
    let boxWidth = 750; 
    let boxHeight = 550;

    this.SignalShopMenuBox.clear();
    this.SignalShopMenuBox.fillStyle(0x000000, 1.0);
    this.SignalShopMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.SignalShopTitleText = this.add.text(boxX + boxWidth / 2, boxY + 20, 'Signal Collection Options', { fontSize: '30px', fill: '#FFFFFF' }).setOrigin(0.5, 0);
    this.SignalShopMenuCloseButton.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);

    // Create buttons for signal options and store them in this.signalButtons
    const signalOptions = ['GM Tube', 'PMT', 'SiPM', 'None'];
    const signalDescriptions = {
        'GM Tube': 'Self-contained gas-filled tube that ionizes when radiation passes through, creating an electrical pulse. Basic but reliable tool for measuring radiation levels in the environment. Great when only counts needed and no energy information desired. Requires middle voltage power supplies.',
        'PMT': 'Moderately sized tube that amplifies light signals from scintillator type detectors. PMTs require high-voltage power supplies. Sensitive to magnetic fields. Ideal when using medium to large detector volumes.',
        'SiPM': 'Compact sensor that detects light signals from scintillator detectors. SiPMs require low-voltage power supplies. Sensitive to temperature. Ideal when multiple detector channels are needed.',
        'None': 'Selecting no signal collection option.'};

    this.signalButtons = [];
    this.selectedButton = null;
    this.descriptionBox = this.add.graphics();
    this.descriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.descriptionBox.fillRect(boxX + boxWidth - 350, boxY + 100, 320, boxHeight - 200);
    this.descriptionText = this.add.text(boxX + boxWidth - 340, boxY + 120, '', { fontSize: '16px', fill: '#000000', wordWrap: { width: 300 } });

    const buttonSpacing = 50;
    let buttonY = boxY + 100;

    signalOptions.forEach((option, index) => {
        let button = this.add.text(boxX + 50, buttonY, option, { fontSize: '20px', fill: '#FFFFFF' })
            .setInteractive()
            .on('pointerdown', () => this.selectSignal(option, button))
            .on('pointerover', () => {
                button.setStyle({ fill: '#FF0000' });
                this.descriptionText.setText(signalDescriptions[option]);
                this.descriptionBox.setAlpha(1);
            })
            .on('pointerout', () => {
                if (this.selectedButton !== button) {  
                    button.setStyle({ fill: '#FFFFFF' });
                }
                this.descriptionBox.setAlpha(0);
            });

        this.signalButtons.push(button);
        buttonY += buttonSpacing;
    });

    this.SignalShopMenuBox.setAlpha(1);
    this.SignalShopMenuCloseButton.setAlpha(1);
  }

  selectSignal(selectedSignal, selectedButton) {
    const signalCategory = this.player.inventoryCategories.find(category => category.name === 'Signal Collection');

    if (signalCategory) {
        signalCategory.item = selectedSignal;
    } else {
        console.error('Signal Collection category not found in inventoryCategories.');
    }

    if (this.selectedButton) {
        this.selectedButton.setStyle({ fill: '#FFFFFF' });
    }

    selectedButton.setStyle({ fill: '#00FF00' });
    this.selectedButton = selectedButton;
  }

  closeSignalShopMenu() {
    this.isSignalShopMenuOpen = false;

    // Hide the menu elements
    this.SignalShopMenuBox.setAlpha(0);
    this.SignalShopMenuCloseButton.setAlpha(0);
    this.SignalShopTitleText.setAlpha(0);
    this.signalButtons.forEach(button => {
        button.setAlpha(0);
    });
    this.descriptionBox.setAlpha(0);
    this.descriptionText.setAlpha(0);
    this.selectedButton = null;
  }

//////////////////////////////

  showPowerShopMenu() {
    this.isPowerShopMenuOpen = true;
    this.player.setVelocity(0); 

    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25; 
    let boxY = camera.worldView.y + 25; 
    let boxWidth = 750; 
    let boxHeight = 550;

    this.PowerShopMenuBox.clear();
    this.PowerShopMenuBox.fillStyle(0x000000, 1.0);
    this.PowerShopMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.PowerShopTitleText = this.add.text(boxX + boxWidth / 2, boxY + 20, 'Power Supply Options', { fontSize: '32px', fill: '#FFFFFF' }).setOrigin(0.5, 0);
    this.PowerShopMenuCloseButton.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);

    // Create buttons for power options and store them in this.powerButtons
    const powerOptions = ['Low', 'Medium', 'High', 'None'];
    const powerDescriptions = {
        'Low': 'A low-voltage power supply.',
        'Medium': 'A mid-voltage power supply.',
        'High': 'A high-voltage power supply.',
        'None': 'Selecting no power supply option.'};

    this.powerButtons = [];
    this.selectedButton = null;
    this.descriptionBox = this.add.graphics();
    this.descriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.descriptionBox.fillRect(boxX + boxWidth - 350, boxY + 100, 320, boxHeight - 200);
    this.descriptionText = this.add.text(boxX + boxWidth - 340, boxY + 120, '', { fontSize: '16px', fill: '#000000', wordWrap: { width: 300 } });

    const buttonSpacing = 50;
    let buttonY = boxY + 100;

    powerOptions.forEach((option, index) => {
        let button = this.add.text(boxX + 50, buttonY, option, { fontSize: '20px', fill: '#FFFFFF' })
            .setInteractive()
            .on('pointerdown', () => this.selectPower(option, button))
            .on('pointerover', () => {
                button.setStyle({ fill: '#FF0000' });
                this.descriptionText.setText(powerDescriptions[option]);
                this.descriptionBox.setAlpha(1);
            })
            .on('pointerout', () => {
                if (this.selectedButton !== button) {  
                    button.setStyle({ fill: '#FFFFFF' });
                }
                this.descriptionBox.setAlpha(0);
            });

        this.powerButtons.push(button);
        buttonY += buttonSpacing;
    });

    this.PowerShopMenuBox.setAlpha(1);
    this.PowerShopMenuCloseButton.setAlpha(1);
  }

  selectPower(selectedPower, selectedButton) {
    const powerCategory = this.player.inventoryCategories.find(category => category.name === 'Power Supply');

    if (powerCategory) {
        powerCategory.item = selectedPower;
    } else {
        console.error('Power Suppply category not found in inventoryCategories.');
    }

    if (this.selectedButton) {
        this.selectedButton.setStyle({ fill: '#FFFFFF' });
    }

    selectedButton.setStyle({ fill: '#00FF00' });
    this.selectedButton = selectedButton;
  }

  closePowerShopMenu() {
    this.isPowerShopMenuOpen = false;
    this.PowerShopMenuBox.setAlpha(0);
    this.PowerShopTitleText.setAlpha(0);
    this.PowerShopMenuCloseButton.setAlpha(0);
    this.powerButtons.forEach(button => {
        button.setAlpha(0);
      });
    this.descriptionBox.setAlpha(0);
    this.descriptionText.setAlpha(0);
    this.selectedButton = null;
  }

//////////////////////////////

  showDAQShopMenu() {
    this.isDAQShopMenuOpen = true;
    this.player.setVelocity(0); 

    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25; 
    let boxY = camera.worldView.y + 25; 
    let boxWidth = 750; 
    let boxHeight = 550;

    this.DAQShopMenuBox.clear();
    this.DAQShopMenuBox.fillStyle(0x000000, 1.0);
    this.DAQShopMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.DAQShopTitleText = this.add.text(boxX + boxWidth / 2, boxY + 20, 'Data Acquisition Options', { fontSize: '32px', fill: '#FFFFFF' }).setOrigin(0.5, 0);
    this.DAQShopMenuCloseButton.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);

    // Create buttons for power options and store them in this.powerButtons
    const daqOptions = ['Offline', 'Online', 'None'];
    const daqDescriptions = {
        'Offline': 'Only include when a DAQ method is explicitly requested.\n\nOffline data acquisition just saves raw data. No additional processing steps are done. Allows for through analysis of the data in full later. Typically least expensive option.',
        'Online': 'Only include when DAQ method is explicitly requested.\n\nOnline data acquisition saves raw data in additional to performing additional post-processing steps. Allows for immediate feedback of the acquired data. Typically more expensive option.',
        'None': 'Selecting no data acquisition option.'};

    this.daqButtons = [];
    this.selectedButton = null;
    this.descriptionBox = this.add.graphics();
    this.descriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.descriptionBox.fillRect(boxX + boxWidth - 350, boxY + 100, 320, boxHeight - 200);
    this.descriptionText = this.add.text(boxX + boxWidth - 340, boxY + 120, '', { fontSize: '16px', fill: '#000000', wordWrap: { width: 300 } });

    const buttonSpacing = 50;
    let buttonY = boxY + 100;

    daqOptions.forEach((option, index) => {
        let button = this.add.text(boxX + 50, buttonY, option, { fontSize: '20px', fill: '#FFFFFF' })
            .setInteractive()
            .on('pointerdown', () => this.selectDAQ(option, button))
            .on('pointerover', () => {
                button.setStyle({ fill: '#FF0000' });
                this.descriptionText.setText(daqDescriptions[option]);
                this.descriptionBox.setAlpha(1);
            })
            .on('pointerout', () => {
                if (this.selectedButton !== button) {  
                    button.setStyle({ fill: '#FFFFFF' });
                }
                this.descriptionBox.setAlpha(0);
            });

        this.daqButtons.push(button);
        buttonY += buttonSpacing;
    });

    this.DAQShopMenuBox.setAlpha(1);
    this.DAQShopMenuCloseButton.setAlpha(1);
  }

  selectDAQ(selectedDAQ, selectedButton) {
    const daqCategory = this.player.inventoryCategories.find(category => category.name === 'Data Acquisition');

    if (daqCategory) {
        daqCategory.item = selectedDAQ;
    } else {
        console.error('DAQ category not found in inventoryCategories.');
    }

    if (this.selectedButton) {
        this.selectedButton.setStyle({ fill: '#FFFFFF' });
    }

    selectedButton.setStyle({ fill: '#00FF00' });
    this.selectedButton = selectedButton;
  }

  closeDAQShopMenu() {
    this.isDAQShopMenuOpen = false;
    this.DAQShopMenuBox.setAlpha(0);
    this.DAQShopMenuCloseButton.setAlpha(0);
    this.DAQShopTitleText.setAlpha(0);
    this.daqButtons.forEach(button => {
        button.setAlpha(0);
      });
    this.descriptionBox.setAlpha(0);
    this.descriptionText.setAlpha(0);
    this.selectedButton = null;
  }

//////////////////////////////

  showDeployShopMenu() {
    this.isDeployShopMenuOpen = true;
    this.player.setVelocity(0); 

    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25; 
    let boxY = camera.worldView.y + 25; 
    let boxWidth = 750; 
    let boxHeight = 550;

    this.DeployShopMenuBox.clear();
    this.DeployShopMenuBox.fillStyle(0x000000, 1.0);
    this.DeployShopMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.DeployShopTitleText = this.add.text(boxX + boxWidth / 2, boxY + 20, 'Deployment Options', { fontSize: '32px', fill: '#FFFFFF' }).setOrigin(0.5, 0);
    this.DeployShopMenuCloseButton.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);

    // Create buttons for deploy options and store them in this.powerButtons
    const deployOptions = ['Fixed', 'Handheld', 'Hybrid', 'None'];
    const deployDescriptions = {
        'Fixed': 'Only include when a deployment method is explicitly requested.\n\nDetection system is deployed as a fixed installation that is permanent and unmovable.',
        'Handheld': 'Only include when a deployment method is explicitly requested.\n\nDetection system is deployed as a portable and easily handled system.',
        'Hybrid': 'Only include when a deployment method is explicitly requested.\n\nDetection system is built to be suitable for either fixed or portable purposes',
        'None': 'Selecting no deployment option.'};

    this.deployButtons = [];
    this.selectedButton = null;
    this.descriptionBox = this.add.graphics();
    this.descriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.descriptionBox.fillRect(boxX + boxWidth - 350, boxY + 100, 320, boxHeight - 200);
    this.descriptionText = this.add.text(boxX + boxWidth - 340, boxY + 120, '', { fontSize: '16px', fill: '#000000', wordWrap: { width: 300 } });

    const buttonSpacing = 50;
    let buttonY = boxY + 100;

    deployOptions.forEach((option, index) => {
        let button = this.add.text(boxX + 50, buttonY, option, { fontSize: '20px', fill: '#FFFFFF' })
            .setInteractive()
            .on('pointerdown', () => this.selectDeploy(option, button))
            .on('pointerover', () => {
                button.setStyle({ fill: '#FF0000' });
                this.descriptionText.setText(deployDescriptions[option]);
                this.descriptionBox.setAlpha(1);
            })
            .on('pointerout', () => {
                if (this.selectedButton !== button) {  
                    button.setStyle({ fill: '#FFFFFF' });
                }
                this.descriptionBox.setAlpha(0);
            });

        this.deployButtons.push(button);
        buttonY += buttonSpacing;
    });

    this.DeployShopMenuBox.setAlpha(1);
    this.DeployShopMenuCloseButton.setAlpha(1);
  }

  selectDeploy(selectedDeploy, selectedButton) {
    const deployCategory = this.player.inventoryCategories.find(category => category.name === 'Deployment');

    if (deployCategory) {
        deployCategory.item = selectedDeploy;
    } else {
        console.error('Deployment category not found in inventoryCategories.');
    }

    if (this.selectedButton) {
        this.selectedButton.setStyle({ fill: '#FFFFFF' });
    }

    selectedButton.setStyle({ fill: '#00FF00' });
    this.selectedButton = selectedButton;
  }

  closeDeployShopMenu() {
    this.isDeployShopMenuOpen = false;
    this.DeployShopMenuBox.setAlpha(0);
    this.DeployShopMenuCloseButton.setAlpha(0);
    this.DeployShopTitleText.setAlpha(0);
    this.deployButtons.forEach(button => {
        button.setAlpha(0);
      });
    this.descriptionBox.setAlpha(0);
    this.descriptionText.setAlpha(0);
    this.selectedButton = null;
  }

//////////////////////////////

  showFFShopMenu() {
    this.isFFShopMenuOpen = true;
    this.player.setVelocity(0); 

    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25; 
    let boxY = camera.worldView.y + 25; 
    let boxWidth = 750; 
    let boxHeight = 550;

    this.FFShopMenuBox.clear();
    this.FFShopMenuBox.fillStyle(0x000000, 1.0);
    this.FFShopMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.FFShopTitleText = this.add.text(boxX + boxWidth / 2, boxY + 20, 'System Form Factor Options', { fontSize: '29px', fill: '#FFFFFF' }).setOrigin(0.5, 0);
    this.FFShopMenuCloseButton.setPosition(boxX + boxWidth - 50, boxY + boxHeight - 50);

    // Create buttons for form factor options and store them 
    const ffOptions = ['Small', 'Medium', 'Large', 'None'];
    const ffDescriptions = {
        'Small': 'Only include when a detector form factor is explicitly requested.\n\nDetection system active volume is small. Improves portability at the cost of efficiency.',
        'Medium': 'Only include when a detector form factor is explicitly requested.\n\nDetection system active volume is average. Normal portability and efficiency.',
        'Large': 'Only include when a detector form factor is explicitly requested.\n\nDetection system active volume is large. Worse portability but efficiency is improved.',
        'None': 'Selecting no detector form factor option.'};

    this.ffButtons = [];
    this.selectedButton = null;
    this.descriptionBox = this.add.graphics();
    this.descriptionBox.fillStyle(0xA9A9A9, 1.0);
    this.descriptionBox.fillRect(boxX + boxWidth - 350, boxY + 100, 320, boxHeight - 200);
    this.descriptionText = this.add.text(boxX + boxWidth - 340, boxY + 120, '', { fontSize: '16px', fill: '#000000', wordWrap: { width: 300 } });

    const buttonSpacing = 50;
    let buttonY = boxY + 100;

    ffOptions.forEach((option, index) => {
        let button = this.add.text(boxX + 50, buttonY, option, { fontSize: '20px', fill: '#FFFFFF' })
            .setInteractive()
            .on('pointerdown', () => this.selectFF(option, button))
            .on('pointerover', () => {
                button.setStyle({ fill: '#FF0000' });
                this.descriptionText.setText(ffDescriptions[option]);
                this.descriptionBox.setAlpha(1);
            })
            .on('pointerout', () => {
                if (this.selectedButton !== button) {  
                    button.setStyle({ fill: '#FFFFFF' });
                }
                this.descriptionBox.setAlpha(0);
            });

        this.ffButtons.push(button);
        buttonY += buttonSpacing;
    });

    this.FFShopMenuBox.setAlpha(1);
    this.FFShopMenuCloseButton.setAlpha(1);
  }

  selectFF(selectedFF, selectedButton) {
    const ffCategory = this.player.inventoryCategories.find(category => category.name === 'Form Factor');

    if (ffCategory) {
        ffCategory.item = selectedFF;
    } else {
        console.error('Form Factor category not found in inventoryCategories.');
    }

    if (this.selectedButton) {
        this.selectedButton.setStyle({ fill: '#FFFFFF' });
    }

    selectedButton.setStyle({ fill: '#00FF00' });
    this.selectedButton = selectedButton;
  }

  closeFFShopMenu() {
    this.isFFShopMenuOpen = false;
    this.FFShopMenuBox.setAlpha(0);
    this.FFShopMenuCloseButton.setAlpha(0);
    this.FFShopTitleText.setAlpha(0);
    this.ffButtons.forEach(button => {
        button.setAlpha(0);
      });
    this.descriptionBox.setAlpha(0);
    this.descriptionText.setAlpha(0);
    this.selectedButton = null;
  }

//////////////////////////////

  showInventory() {
    console.log('Inventory button pressed!');
    this.isInventoryMenuOpen = true; // Set inventory to open
    this.player.setVelocity(0);      // Stop the player immediately when the menu is opened

    // Create an empty inventory box
    this.inventoryMenuBox = this.add.graphics();
    let camera = this.cameras.main;
    let boxX = camera.worldView.x + 25;
    let boxY = camera.worldView.y + 25;
    let boxWidth = 750;
    let boxHeight = 550;

    this.inventoryMenuBox.fillStyle(0x000000, 1.0);
    this.inventoryMenuBox.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Create slots for the six categories
    const slotSpacing = 60;
    const startX = boxX + 50; // Keep category labels where they were originally (left side)
    const startY = boxY + 50;

    // New position for the slots and item descriptions (move them to the right)
    const slotStartX = boxX + 250; // Move slot boxes and descriptions 250px to the right

    // Slot width increased to accommodate longer item descriptions
    const slotWidth = 250; // Increase width of the slots

    // Array to store references for labels, slots, and item text
    this.inventoryItems = []; // Keep this as a local reference, don't wipe player inventory

    // Iterate over the player inventory categories (this.player.inventoryCategories)
    for (let i = 0; i < this.player.inventoryCategories.length; i++) {
        let category = this.player.inventoryCategories[i];
        let slotY = startY + (i * slotSpacing);

        // Draw the category label (e.g., 'Detector', 'Signal Collection', etc.)
        let label = this.add.text(startX, slotY, category.name, { fontSize: '20px', fill: '#FFFFFF' });

        // Check if the category has an item; if not, show "None" next to the slot
        //let itemText = category.item ? category.item : "None";
        let itemText = category.item;

        // Draw the slot rectangle (move slot boxes to the right and increase width)
        let slot = this.add.rectangle(slotStartX + 200, slotY, slotWidth, 40, 0x888888).setOrigin(0.5, 0.5);

        // Draw the item text (either the item's name or "None") next to the slot
        let itemTextObj = this.add.text(slotStartX + 200, slotY, itemText, { fontSize: '18px', fill: '#FFFFFF' }).setOrigin(0.5, 0.5);

        // Store references to the label, slot, and item text
        this.inventoryItems.push({ label, slot, itemText: itemTextObj });
    }

    // Add the close button for the inventory menu
    this.inventoryCustomerMenuCloseButton = this.add.image(boxX + boxWidth - 50, boxY + boxHeight - 50, 'closeButton').setInteractive();
    this.inventoryCustomerMenuCloseButton.setScale(0.050);
    this.inventoryCustomerMenuCloseButton.on('pointerdown', this.closeInventory, this);

    // Make the inventory visible
    this.inventoryMenuBox.setAlpha(1);
    this.inventoryCustomerMenuCloseButton.setAlpha(1);}

  closeInventory() {
      this.isInventoryMenuOpen = false; // Close the inventory menu

      // Hide the inventory box and close button
      this.inventoryMenuBox.setAlpha(0);
      this.inventoryCustomerMenuCloseButton.setAlpha(0);

      // Hide the inventory items (labels, slots, and item texts)
      this.inventoryItems.forEach(item => {
          item.label.setAlpha(0);     // Hide the label
          item.slot.setAlpha(0);      // Hide the slot
          item.itemText.setAlpha(0);  // Hide the item text ("None" or item name)
      });}

  update() {
    if (this.isCustomer1MenuOpen || this.isCustomer2MenuOpen || this.isCustomer3MenuOpen || this.isCustomer4MenuOpen || this.isCustomer5MenuOpen || this.isCustomer6MenuOpen || this.isInventoryMenuOpen || this.isDetectorShopMenuOpen || this.isSignalShopMenuOpen || this.isPowerShopMenuOpen || this.isDAQShopMenuOpen || this.isDAQShopMenuOpen || this.isDeployShopMenuOpen || this.isFFShopMenuOpen) {
      return; // If any menu is open, prevent any player movement
    }

    this.player.setVelocity(0);

    // Handle player movement based on arrow key input
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.player.anims.play('walkLeft', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.anims.play('walkRight', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
      this.player.anims.play('walkUp', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
      this.player.anims.play('walkDown', true);
    } else {
      this.player.anims.stop();
    }

    // Update the position of the inventory button relative to the camera
    let camera = this.cameras.main;
    this.inventoryButton.setPosition(camera.worldView.x + camera.width - 82.5, camera.worldView.y + 35);
    
    ////////////////////////
    // Calculate player distance to the center of the Detector Shop
    let distanceToDetectorShop = Phaser.Math.Distance.Between(this.player.x, this.player.y, 80, 240);  

    if (distanceToDetectorShop < 50) {        // Adjustable the distance threshold
      this.DetectorShopPrompt.setAlpha(1);         // Show the customer notification prompt text
      this.DetectorShopPromptTextBox.setAlpha(1);  // Show the transparent box behind the customer notification prompt text

      // Position the DetectorShopPromptTextBox and DetectorShopPrompt relative to the camera view
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;

      // Clear previous drawing and draw with updated transparency
      this.DetectorShopPromptTextBox.clear();  // Clear previous rectangle
      this.DetectorShopPromptTextBox.fillStyle(0x000000, 0.5);  // Apply 50% transparency
      this.DetectorShopPromptTextBox.fillRect(cameraX + 175, cameraY + 530, 450, 40);  // Draw the box behind the text

      // Position DetectorShopPrompt text relative to the camera view
      this.DetectorShopPrompt.setPosition(cameraX + 400, cameraY + 550);  // Adjust for camera offset
    } else {
      this.DetectorShopPrompt.setAlpha(0);  // Hide the DetectorShopPrompt
      this.DetectorShopPromptTextBox.setAlpha(0);  // Hide the transparent box behind the text
    }

    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q), 500) && this.DetectorShopPrompt.alpha > 0) {
      console.log("Key pressed for shop menu")
      this.showDetectorShopMenu();
    }
    // Calculate player distance to the center of the Signal Shop
    let distanceToSignalShop = Phaser.Math.Distance.Between(this.player.x, this.player.y, 80, 390);  
    if (distanceToSignalShop < 50) {        
      this.SignalShopPrompt.setAlpha(1);         
      this.SignalShopPromptTextBox.setAlpha(1);
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.SignalShopPromptTextBox.clear();  
      this.SignalShopPromptTextBox.fillStyle(0x000000, 0.5);  
      this.SignalShopPromptTextBox.fillRect(cameraX + 125, cameraY + 530, 550, 40);
      this.SignalShopPrompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.SignalShopPrompt.setAlpha(0);  
      this.SignalShopPromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), 500) && this.SignalShopPrompt.alpha > 0) {
      console.log("Key pressed for shop menu")
      this.showSignalShopMenu();
    }
    // Calculate player distance to the center of the Power Shop
    let distanceToPowerShop = Phaser.Math.Distance.Between(this.player.x, this.player.y, 80, 540);  
    if (distanceToPowerShop < 50) {        
      this.PowerShopPrompt.setAlpha(1);         
      this.PowerShopPromptTextBox.setAlpha(1);
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.PowerShopPromptTextBox.clear();  
      this.PowerShopPromptTextBox.fillStyle(0x000000, 0.5);  
      this.PowerShopPromptTextBox.fillRect(cameraX + 150, cameraY + 530, 495, 40); 
      this.PowerShopPrompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.PowerShopPrompt.setAlpha(0);  
      this.PowerShopPromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E), 500) && this.PowerShopPrompt.alpha > 0) {
      console.log("Key pressed for shop menu")
      this.showPowerShopMenu();
    }
    // Calculate player distance to the center of the DAQ Shop
    let distanceToDAQShop = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1120, 240);  
    if (distanceToDAQShop < 50) {        
      this.DAQShopPrompt.setAlpha(1);         
      this.DAQShopPromptTextBox.setAlpha(1);
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.DAQShopPromptTextBox.clear();  
      this.DAQShopPromptTextBox.fillStyle(0x000000, 0.5);  
      this.DAQShopPromptTextBox.fillRect(cameraX + 180, cameraY + 530, 440, 40); 
      this.DAQShopPrompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.DAQShopPrompt.setAlpha(0);  
      this.DAQShopPromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A), 500) && this.DAQShopPrompt.alpha > 0) {
      console.log("Key pressed for shop menu")
      this.showDAQShopMenu();
    }
    // Calculate player distance to the center of the Deploy Shop
    let distanceToDeployShop = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1120, 390);  
    if (distanceToDeployShop < 50) {        
      this.DeployShopPrompt.setAlpha(1);         
      this.DeployShopPromptTextBox.setAlpha(1);
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.DeployShopPromptTextBox.clear();  
      this.DeployShopPromptTextBox.fillStyle(0x000000, 0.5);  
      this.DeployShopPromptTextBox.fillRect(cameraX + 165, cameraY + 530, 465, 40); 
      this.DeployShopPrompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.DeployShopPrompt.setAlpha(0);  
      this.DeployShopPromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S), 500) && this.DeployShopPrompt.alpha > 0) {
      console.log("Key pressed for shop menu")
      this.showDeployShopMenu();
    }
    // Calculate player distance to the center of the FF Shop
    let distanceToFFShop = Phaser.Math.Distance.Between(this.player.x, this.player.y, 1120, 540);  
    if (distanceToFFShop < 50) {        
      this.FFShopPrompt.setAlpha(1);         
      this.FFShopPromptTextBox.setAlpha(1);
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.FFShopPromptTextBox.clear();  
      this.FFShopPromptTextBox.fillStyle(0x000000, 0.5);  
      this.FFShopPromptTextBox.fillRect(cameraX + 160, cameraY + 530, 480, 40); 
      this.FFShopPrompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.FFShopPrompt.setAlpha(0);  
      this.FFShopPromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), 500) && this.FFShopPrompt.alpha > 0) {
      console.log("Key pressed for shop menu")
      this.showFFShopMenu();
    }
    ////////////////////////

    // Check distance to Table 1
    let distanceToTable1 = Phaser.Math.Distance.Between(this.player.x, this.player.y, 350, 175);
    if (distanceToTable1 < 90 && !this.isCustomer1Fulfilled) {             
      this.Customer1Prompt.setAlpha(1);        
      this.Customer1PromptTextBox.setAlpha(1);  
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.Customer1PromptTextBox.clear(); 
      this.Customer1PromptTextBox.fillStyle(0x000000, 0.5); 
      this.Customer1PromptTextBox.fillRect(cameraX + 250, cameraY + 530, 300, 40); 
      this.Customer1Prompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.Customer1Prompt.setAlpha(0);  
      this.Customer1PromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE), 500) && this.Customer1Prompt.alpha > 0) {
      console.log('Customer 1 menu opened!');
      this.showCustomer1Menu();
    }

    // Check distance to Table 2
    let distanceToTable2 = Phaser.Math.Distance.Between(this.player.x, this.player.y, 600, 175);
    if (distanceToTable2 < 90 && !this.isCustomer2Fulfilled) {             
      this.Customer2Prompt.setAlpha(1);        
      this.Customer2PromptTextBox.setAlpha(1);  
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.Customer2PromptTextBox.clear(); 
      this.Customer2PromptTextBox.fillStyle(0x000000, 0.5); 
      this.Customer2PromptTextBox.fillRect(cameraX + 250, cameraY + 530, 300, 40); 
      this.Customer2Prompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.Customer2Prompt.setAlpha(0);  
      this.Customer2PromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO), 500) && this.Customer2Prompt.alpha > 0) {
      console.log('Customer 2 menu opened!');
      this.showCustomer2Menu();
    }

    // Check distance to Table 3
    let distanceToTable3 = Phaser.Math.Distance.Between(this.player.x, this.player.y, 850, 175);
    if (distanceToTable3 < 90 && !this.isCustomer3Fulfilled) {             
      this.Customer3Prompt.setAlpha(1);        
      this.Customer3PromptTextBox.setAlpha(1);  
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.Customer3PromptTextBox.clear(); 
      this.Customer3PromptTextBox.fillStyle(0x000000, 0.5); 
      this.Customer3PromptTextBox.fillRect(cameraX + 250, cameraY + 530, 300, 40); 
      this.Customer3Prompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.Customer3Prompt.setAlpha(0);  
      this.Customer3PromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE), 500) && this.Customer3Prompt.alpha > 0) {
      console.log('Customer 3 menu opened!');
      this.showCustomer3Menu();
    }

    // Check distance to Table 4
    let distanceToTable4 = Phaser.Math.Distance.Between(this.player.x, this.player.y, 350, 425);
    if (distanceToTable4 < 90 && !this.isCustomer4Fulfilled) {             
      this.Customer4Prompt.setAlpha(1);        
      this.Customer4PromptTextBox.setAlpha(1);  
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.Customer4PromptTextBox.clear(); 
      this.Customer4PromptTextBox.fillStyle(0x000000, 0.5); 
      this.Customer4PromptTextBox.fillRect(cameraX + 250, cameraY + 530, 300, 40); 
      this.Customer4Prompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.Customer4Prompt.setAlpha(0);  
      this.Customer4PromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR), 500) && this.Customer4Prompt.alpha > 0) {
      console.log('Customer 4 menu opened!');
      this.showCustomer4Menu();
    }

    // Check distance to Table 5
    let distanceToTable5 = Phaser.Math.Distance.Between(this.player.x, this.player.y, 600, 425);
    if (distanceToTable5 < 90 && !this.isCustomer5Fulfilled) {             
      this.Customer5Prompt.setAlpha(1);        
      this.Customer5PromptTextBox.setAlpha(1);  
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;
      this.Customer5PromptTextBox.clear(); 
      this.Customer5PromptTextBox.fillStyle(0x000000, 0.5); 
      this.Customer5PromptTextBox.fillRect(cameraX + 250, cameraY + 530, 300, 40); 
      this.Customer5Prompt.setPosition(cameraX + 400, cameraY + 550); 
    } else {
      this.Customer5Prompt.setAlpha(0);  
      this.Customer5PromptTextBox.setAlpha(0);  
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE), 500) && this.Customer5Prompt.alpha > 0) {
      console.log('Customer 5 menu opened!');
      this.showCustomer5Menu();
    }

    // Check distance to Table 6
    let distanceToTable6 = Phaser.Math.Distance.Between(this.player.x, this.player.y, 850, 425);
    
    if (distanceToTable6 < 90 && !this.isCustomer6Fulfilled) {              // Adjustable the distance threshold
      this.Customer6Prompt.setAlpha(1);         // Show the customer notification prompt text
      this.Customer6PromptTextBox.setAlpha(1);  // Show the transparent box behind the customer notification prompt text

      // Position the CustomerPromptTextBox and CustomerPrompt relative to the camera view
      let cameraX = camera.worldView.x;
      let cameraY = camera.worldView.y;

      // Clear previous drawing and draw with updated transparency
      this.Customer6PromptTextBox.clear();  // Clear previous rectangle
      this.Customer6PromptTextBox.fillStyle(0x000000, 0.5);  // Apply 50% transparency
      this.Customer6PromptTextBox.fillRect(cameraX + 250, cameraY + 530, 300, 40);  // Draw the box behind the text

      // Position CustomerPrompt text relative to the camera view
      this.Customer6Prompt.setPosition(cameraX + 400, cameraY + 550);  // Adjust for camera offset
    } else {
      this.Customer6Prompt.setAlpha(0);  // Hide the CustomerPrompt
      this.Customer6PromptTextBox.setAlpha(0);  // Hide the transparent box behind the text
    }

    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX), 500) && this.Customer6Prompt.alpha > 0) {
      console.log('Customer 6 menu opened!');
      this.showCustomer6Menu(); // Show the customer 6 menu when 6 key is pressed and the customer notification prompt is visible
    }
  }
}

// Game Configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainMenu, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);