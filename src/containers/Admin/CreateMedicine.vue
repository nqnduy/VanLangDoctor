<template>
   <div class="adminCreateMedicine">
      <AdminManagement :active="2" isChild="yes" childTitle="Tạo thông tin thuốc" />
      <div class="wrapMain">
         <div class="content">
            <ValidationObserver v-slot="{handleSubmit}">
               <form action="" class="formCreateMedicine" @submit.prevent="handleSubmit(onSubmit)">
                  <div class="informUpdate">
                     <div class="inputGroup">
                        <!-- note: tên thuốc -->
                        <div class="text-field">
                           <ValidationProvider name="Tên thuốc" rules="required" v-slot="{ errors }">
                              <label for="medicineName"
                                 >Tên thuốc
                                 <p class="require">*</p></label
                              >
                              <input autocomplete="off" type="text" id="medicineName" placeholder="Nhập tên thuốc" v-model="createMedicine.name" />
                              <span>{{ errors[0] }}</span>
                           </ValidationProvider>
                        </div>

                        <!-- note: Nhóm thuốc -->
                        <div class="text-field">
                           <ValidationProvider name="Nhóm thuốc" rules="required" v-slot="{ errors }">
                              <label for="medicineCategoryId"
                                 >Nhóm thuốc
                                 <p class="require">*</p></label
                              >
                              <select v-model="createMedicine.medicineCategoryId" class="decorated">
                                 <option v-for="category in categoryList" :key="category.id" style="background-color: #d0eff2" :value="category.id">{{category.name}}</option>
                              </select>
                              <span>{{ errors[0] }}</span>
                           </ValidationProvider>
                        </div>

                        <!-- note: Hoạt chất & Hàm lượng -->
                        <div class="dFlex">
                           <div class="text-field">
                              <ValidationProvider name="Đường dùng" rules="required" v-slot="{ errors }">
                                 <label for="route"
                                    >Đường dùng
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="route" placeholder="Nhập đường dùng" v-model="createMedicine.route" />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                           <!-- note: Hàm lượng -->
                           <div class="text-field">
                              <ValidationProvider name="Hàm lượng" rules="required" v-slot="{ errors }">
                                 <label for="content"
                                    >Hàm lượng
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="content" placeholder="Nhập hàm lượng" v-model="createMedicine.content" />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                        </div>

                        <!-- note: Đóng gói & Đơn vị -->
                        <div class="dFlex">
                           <!-- note: Đóng gói -->
                           <div class="text-field">
                              <ValidationProvider name="Đóng gói" rules="required" v-slot="{ errors }">
                                 <label for="packing"
                                    >Đóng gói
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="packing" placeholder="Nhập quy cách đóng gói" v-model="createMedicine.packing" />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>

                           <!-- note: Đơn vị -->
                           <div class="text-field">
                              <ValidationProvider name="Đơn vị tính" rules="required" v-slot="{ errors }">
                                 <label for="unit"
                                    >Đơn vị
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="unit" placeholder="Nhập đơn vị tính" v-model="createMedicine.unit" />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                        </div>
                                                <div class="dFlex">
                           <div class="text-field">
                              <ValidationProvider name="Hoạt chất" rules="required" v-slot="{ errors }">
                                 <label for="active"
                                    >Hoạt chất
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="active" placeholder="Nhập hoạt chất của thuốc" v-model="createMedicine.active" />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                           <div class="text-field">
                           <ValidationProvider name="Số đăng ký" rules="required" v-slot="{ errors }">
                              <label for="registeredNumber"
                                 >Số đăng ký
                                 <p class="require">*</p></label
                              >
                              <input
                                 autocomplete="off"
                                 type="text"
                                 id="registeredNumber"
                                 placeholder="Nhập số đăng ký"
                                 v-model="createMedicine.registeredNumber"
                              />
                              <span>{{ errors[0] }}</span>
                           </ValidationProvider>
                        </div>
                        </div>
                        <div class="text-field">

                        </div>
                        <div class="text-field">
                              <ValidationProvider name="Thành phần" rules="required" v-slot="{ errors }">
                                 <label for="ingredients"
                                    >Thành phần
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="ingredients" placeholder="Nhập thành phần" v-model="createMedicine.ingredients" />
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                        <div class="text-field">
                              <ValidationProvider name="Tác dụng phụ" rules="required" v-slot="{ errors }">
                                 <label for="unit"
                                    >Tác dụng phụ
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="unit" placeholder="Nhập Tác dụng phụ" v-model="createMedicine.sideEffects">
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                        </div>
                                                   <div class="text-field">
                              <ValidationProvider name="Chỉ định" rules="required" v-slot="{ errors }">
                                 <label for="pack"
                                    >Chỉ định
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="pack" placeholder="Nhập chỉ định" v-model="createMedicine.indications">
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>

                           <div class="text-field">
                              <ValidationProvider name="Chống chỉ định" rules="required" v-slot="{ errors }">
                                 <label for="unit"
                                    >Chống chỉ định
                                    <p class="require">*</p></label
                                 >
                                 <input autocomplete="off" type="text" id="unit" placeholder="Nhập chống chỉ định" v-model="createMedicine.contraindication">
                                 <span>{{ errors[0] }}</span>
                              </ValidationProvider>
                           </div>
                     </div>
                     <div class="btnGroup">
                        <VButtonHome title="Huỷ" :option="'white'" :route="'AdminMedicineList'"/>
                        <VButtonSubmit title="Tạo mới" />
                     </div>
                  </div>
               </form>
            </ValidationObserver>
         </div>
      </div>
   </div>
</template>
<script>
import AdminManagement from "./AdminManagement.vue";
import VButtonSubmit from "../../components/VButtonSubmit.vue";
import VButtonHome from "../../components/VButtonHome.vue";
import { mapActions, mapGetters } from "vuex";
export default {
   components: {
      AdminManagement,
      VButtonSubmit,
      VButtonHome,
   },
   computed: {
      ...mapGetters(['getAdminListCategory','getAdminCategoryQuery'])
   },
   data() {
      return {
         createMedicine: {
            name: "",
            medicineCategoryId: "",
            ingredients: "",
            content: "",
            route: "",
            packing: "",
            unit: "",
            registeredNumber: "",
            sideEffects: '',
            indications: '',
            contraindication: '',
            active : '',
         },
         categoryList: null,
      };
   },
   created(){
      this.checkCategoryList();
   },
   methods: {
      checkCategoryList(){
        let query = {
            page: 1,
            sortOrder: 'Accsending',
            sortColumn: "name",
            search: null,
            Limit: 200,
         }
         this.adminGetCategory(query)
               .then(()=>{
                  this.categoryList = this.getAdminListCategory.items;
               })
      },
      onSubmit(){
         this.adminCreateMedicine(this.createMedicine)
            .then(() => {
               this.$swal.fire("Tạo thông tin thuốc thành công", "", "success");
               this.$router.push({ path: 'medicinelist' })
            })
         },
      ...mapActions(['adminGetCategory','adminCreateMedicine'])
   },
};
</script>

<style lang="scss" scoped></style>
